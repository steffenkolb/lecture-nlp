# Mosquitto MQTT broker

In case you want to run your own MQTT broker on your computer you can use this configuration.
We will use docker to run the Mosquitto MQTT broker.

The broker will be available on "localhost:1883" without authorization or encryption.

## Install Docker
Follow the instructions here: https://docs.docker.com/install/

## Run Mosquitto
1. Open a shell or terminal
2. Change directory to where this script is
3. Run the `startup.sh` script
```bash
$ sh startup.sh
mosquitto[1]: mosquitto version 1.4.12 (build date 2017-06-01 13:03:46+0000) starting
mosquitto[1]: Config loaded from /mosquitto/config/mosquitto.conf.
mosquitto[1]: Opening ipv4 listen socket on port 1883.
mosquitto[1]: Opening ipv6 listen socket on port 1883.
```
Your broker is now ready to accept client connections.