#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <dht.h>

#define dht_apin 2 // Pin number on board where sensor is connected to
dht DHT;

// Pin number on board where LED is connected to
#define B_PIN D5
#define G_PIN D6
#define R_PIN D7


// replace the following values with your information
const char* ssid = "Free Wifi";
const char* password = "KIWIEXPRESS";

// every mqtt client must have its own name; choose anything
const char* mqttClientName = "YOUR_CLIENT_NAME";

// IP address or URL of your MQTT broker/server.
// For demo purposes you can use  the public mosquitto broker "test.mosquitto.org"
// See http://test.mosquitto.org
const char* mqttServer = "192.168.178.57";

// basic mqtt port; should not be changed
const int mqttPort = 1883;

// topic to receive LED data
const char* ledTopic = "iot/led";

// variable to store refresh time for temperature to only serve temperature every 5 seconds
const unsigned long REFRESH_INTERVAL = 5000; // ms
unsigned long lastRefreshTime = 0;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void connectToWifi() {
  //
  delay(4000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
}

void connectToMqtt() {
  mqttClient.setServer(mqttServer, mqttPort);
  while (!mqttClient.connected()) {
    Serial.println("Connecting to MQTT...");

    if (mqttClient.connect(mqttClientName)) {
      Serial.println("connected");
    } else {
      Serial.print("failed with state ");
      Serial.print(mqttClient.state());
      Serial.println();
      delay(2000);
    }
  }
}

void readTempertatureHumidity() {
  DHT.read11(dht_apin);
  Serial.print("Current humidity = ");
  Serial.print(DHT.humidity);
  Serial.print("%  ");
  Serial.print("temperature = ");
  Serial.print(DHT.temperature);
  Serial.println("C  ");
}

void sendMessage(String input, char* topic) {
  int strLen = (input.length() + 1);
  char message[strLen];
  input.toCharArray(message, strLen);

  Serial.println("Sending " + input);
  mqttClient.publish(topic, message);
}

/** 
 *  This function is called whenever a new message arrives from the MQTT broker 
 */
void callback(char* topic, byte* payload, unsigned int length) {
  // We will simply print the message to the serial-output
  Serial.print("Message arrived at '");
  Serial.print(topic);
  Serial.print("'");

  // equals-check using strncmp: http://www.cplusplus.com/reference/cstring/strncmp/
  // it will return 0 if the strings are equal -- which means we need to negate it
  if(!strncmp((char *)payload, "ON", length)) {
    analogWrite(R_PIN, 255);
    analogWrite(G_PIN, 255);
    analogWrite(B_PIN, 255);
  } else {
    analogWrite(R_PIN, 0);
    analogWrite(G_PIN, 0);
    analogWrite(B_PIN, 0);
  }

  // line-break
  Serial.println();
}

void setup() {
  Serial.begin(115200);

  // 0. Set mode for this pin to 'Output'
  pinMode(B_PIN, OUTPUT);
  pinMode(G_PIN, OUTPUT);
  pinMode(R_PIN, OUTPUT);

  // 1. Establish connection to the network
  connectToWifi();

  // 2. Establish connection to the MQTT broker
  connectToMqtt();
  
  // 3. Subscribe to LED topic to receive messages
  mqttClient.subscribe(ledTopic);

  // 4. Specify the function to be called whenever an MQTT message arrives
  mqttClient.setCallback(callback);
}

void loop() {
  if (!mqttClient.connected()) {
    connectToMqtt();
  }
  
  if(millis() - lastRefreshTime >= REFRESH_INTERVAL)
	{
    lastRefreshTime += REFRESH_INTERVAL;
    
    readTempertatureHumidity();
    String temp = String(DHT.temperature);
    sendMessage(temp, "iot/temp");

    String humidity = String(DHT.humidity);
    sendMessage(humidity, "iot/humidity");
  }
  mqttClient.loop();
}

