// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

/**
 * We will use compromise NLP library for text-matching.
 * http://compromise.cool
 */
const nlp = require('compromise');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // Handle message activity type. User's responses via text or speech or card interactions flow back to the bot as Message activity.
        // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
        // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            var rawtext = turnContext.activity.text

            // interpret usermessage with compromise for further use
            var userMessage = nlp(rawtext);

            if(userMessage.has("welcome")) {
                await turnContext.sendActivity(`Hello you!`);
            }
            await turnContext.sendActivity(`You said "${rawtext}"`);
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
