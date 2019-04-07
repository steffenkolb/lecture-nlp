// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

/**
 * Axios is an synchronous/asynchronous HTTP-client library.
 * We will use it to look for the temperature as well as time: https://github.com/request/request
 */
const axios = require('axios');

/**
 * We will use MQTT to send message to IOT devicses
 * https://www.npmjs.com/package/mqtt
 */
var mqtt = require('mqtt')

// replace this with the borker IP address
var client  = mqtt.connect('mqtt://localhost');

// Topic to send the event to
const led_topic = "iot/led";

/**
 * We will use compromise NLP library for text-matching.
 * http://compromise.cool
 */
const nlp = require('compromise');

// define your own plugins / patterns for use in compromise
const plugin = {
    patterns: {
         // Telling the name
        "i'm" : 'Name',
        "i am" : 'Name',
        "my name is" : 'Name',
        "they call me" : 'Name',

        // asking for the time
        "what time is it": "Time",
        "how late is it": "Time",
        "what is the time": "Time",

        // asking for the temperature
        "is it (cold|hot)": "Temp",
        "how (cold|warm|hot) is it": "Temp",
        "what is the current? (temperature|temp)": "Temp",

        // lights on
        "please? turn on the? (light|lights)": "Lights_On",
        "please? turn? the? (light|lights) on": "Lights_On",
        "it is getting? dark": "Lights_On",
        "getting? dark in here": "Lights_On",
        
        // lights off
        "please? turn off the? (light|lights)": "Lights_Off",
        "please? turn? the? (light|lights) off": "Lights_Off",
        "it is getting? (bright|light)": "Lights_Off",
    }
}

nlp.plugin(plugin);

// Name of your properties
const USER_NAME = 'username';

class MyBot {
    constructor(conversationState) {
        // Creates a new state accessor property. Basically a variable to store information about the conversation.
        // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors
        this.username = conversationState.createProperty(USER_NAME);
        this.conversationState = conversationState;
    }

    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // Handle message activity type. User's responses via text or speech or card interactions flow back to the bot as Message activity.
        // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
        // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types

        if (turnContext.activity.type === ActivityTypes.Message) {

            // interpret usermessage with compromise for further use
            var userMessage = nlp(turnContext.activity.text);

            /**
             *  The following if-else clauses will check for different pre-defined messages.
             *  We will use several variants for each message.
             */
            // first we look for welcome message
            if(userMessage.has('hi')
                || userMessage.has('hello')
                || userMessage.has('welcome')) {

                // check if you already know the name of the user
                let user = await this.username.get(turnContext);

                // we do not know it yet
                if(user === undefined) {
                    await turnContext.sendActivity(`Hello!`);
                } else {
                    await turnContext.sendActivity(`Welcome back ${user}!`);
                }
            }

            // find out if the user said his name with pattern matching
            else if(userMessage.has('#Name')) {

                // Then try to find the name of the person
                let name = userMessage.match(`i'm [.]`);

                //or try these versions of it:
                name = name.found ? name : userMessage.match('i am [.]');
                name = name.found ? name : userMessage.match('my name is [.]');
                name = name.found ? name : userMessage.match('they call me [.]');

                // create a normal textform of the name
                console.log(name);
                let userName = name.normalize().toTitleCase().out('text')

                // respond to the user
                await turnContext.sendActivity(`Hello ${userName}.`);

                // store name in conversation memory
                await this.username.set(turnContext, userName);
            }

            // get current time from external webservice
            else if(userMessage.has('#Time')) {
                // request time from internet api
                let timeRequest = await axios.get('http://worldtimeapi.org/api/ip');

                // convert to readable format
                let time = new Date(timeRequest.data.datetime).toTimeString();

                // respond to user
                await turnContext.sendActivity(`The current time is ${time}.`);
            }

            // get current temperature from local node-red server
            else if(userMessage.has('#Temp')) {
                // request time from internet api
                let tempRequest = await axios.get('http://127.0.0.1:1880/temp');

                // convert to readable format
                let temp = tempRequest.data;

                // respond to user
                let card = CardFactory.heroCard(
                    'The current temperature is',
                    [temp],
                    ['cool']
               );
                await turnContext.sendActivity(card);
                //await turnContext.sendActivity(`The current temperature is ${temp}°C.`);
            }

            // turn lights on via mqtt
            else if(userMessage.has('#Lights_On')) {
                // turning on the lights
                client.publish(led_topic, 'ON');

                // respond to user
                await turnContext.sendActivity(`There shall be light`);
            }
            // turn lights off via mqtt
            else if(userMessage.has('#Lights_Off')) {
                // turning on the lights
                client.publish(led_topic, 'OFF');

                // respond to user
                await turnContext.sendActivity(`Dark. Isn't it?`);
            }

            // everything else
            else {
                await turnContext.sendActivity(`Sorry, I do not understand this.`);
            }
            
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
        // Save state changes
        await this.conversationState.saveChanges(turnContext);
    }
}

module.exports.MyBot = MyBot;
