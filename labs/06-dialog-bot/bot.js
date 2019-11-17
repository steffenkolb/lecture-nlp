// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

// this loads the additional libraries to create dialog-contexts
const { ChoicePrompt, DialogSet, NumberPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

// define constant Strings to access different memory-states
const DIALOG_STATE_PROPERTY = 'dialogState';
const USER_PROFILE_PROPERTY = 'user';

// define constant Strings to distinguish different dialog-prompts
const WHO_ARE_YOU = 'who_are_you';
const HELLO_USER = 'hello_user';

const NAME_PROMPT = 'name_prompt';
const CONFIRM_PROMPT = 'confirm_prompt';
const AGE_PROMPT = 'age_prompt';

// just a constant string to access the user values
const USER_INFO = 'user_info';

/**
 * We will use compromise NLP library for text-matching.
 * http://compromise.cool
 */
const nlp = require('compromise');

class DailogBot {
    /**
     * In the constructor we will create and register the different dialog-prompts used in the bot.
     * 
     * @param {ConversationState} conversationState A ConversationState object used to store the dialog state.
     * @param {UserState} userState A UserState object used to store values specific to the user.
     */
    constructor(conversationState, userState) {
        // Create a new state accessor property. See https://aka.ms/about-bot-state-accessors to learn more about bot state and state accessors.
        this.conversationState = conversationState;
        this.userState = userState;

        // create accessor for the conversation state. This enables us to capture and store conversation specific properties.
        // Also create an accessor for userProfile. This enables us to capture and store user-specific properties.
        // For more info either see here: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-state?view=azure-bot-service-4.0&tabs=javascript
        this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);
        this.userProfile = this.userState.createProperty(USER_PROFILE_PROPERTY);

        this.dialogs = new DialogSet(this.dialogState);

        // Add prompts that will be used by the main dialogs.
        this.dialogs.add(new TextPrompt(NAME_PROMPT));
        this.dialogs.add(new ChoicePrompt(CONFIRM_PROMPT));

        // this prompt adds an additional validation-step
        this.dialogs.add(new NumberPrompt(AGE_PROMPT, async (prompt) => {
            // these lines will check the values of the user before allowing the dialog to continue
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value <= 0) {
                    await prompt.context.sendActivity(`Your age can't be less than zero.`);
                    return false;
                } else {
                    return true;
                }
            }

            return false;
        }));

        // A waterfall dialog is a top-down dialog consisting of several dialogs building upon each other
        this.dialogs.add(new WaterfallDialog(WHO_ARE_YOU, [
            // each of those entries bind to local functions
            this.promptForName.bind(this),
            this.confirmAgePrompt.bind(this),
            this.promptForAge.bind(this),
            this.captureAge.bind(this)
        ]));

        // Create a dialog that displays a user name after it has been collected.
        this.dialogs.add(new WaterfallDialog(HELLO_USER, [
            this.displayProfile.bind(this)
        ]));
    }

    // This step in the dialog prompts the user for their name.
    async promptForName(step) {
        // create new object to store the user_info into
        step.values[USER_INFO] = {};
        return await step.prompt(NAME_PROMPT, `What is your name, human?`);
    }

    // This step captures the user's name, then prompts whether or not to collect an age.
    async confirmAgePrompt(step) {
        step.values[USER_INFO].name = step.result;
        await step.prompt(CONFIRM_PROMPT, 'Do you want to give your age?', ['yes', 'no']);
    }

    // This step checks the user's response - if yes, the bot will proceed to prompt for age.
    // Otherwise, the bot will skip the age step.
    async promptForAge(step) {
        if (step.result && step.result.value === 'yes') {
            return await step.prompt(AGE_PROMPT, `What is your age?`,
                {
                    retryPrompt: 'Sorry, please specify your age as a positive number or say cancel.'
                }
            );
        } else {
            return await step.next(-1);
        }
    }

    // This step captures the user's age.
    async captureAge(step) {
        if (step.result !== -1) {            
            // store the age in the info-object
            step.values[USER_INFO].age = step.result;
            await step.context.sendActivity(`I will remember that you are ${ step.result } years old.`);
        } else {
            await step.context.sendActivity(`No age given.`);
        }

        // finally save all this informationen into the user-specific memory
        // tipp: if you are going to use all the information anyways,
        // just store it into the profile right away in each step :)

        // First: Get the state properties from the turn context.
        const user = await this.userProfile.get(step.context, {});

        // then copy the properties directly from the dialog-object
        user.age = step.values[USER_INFO].age;
        user.name = step.values[USER_INFO].name;

        // finally store it all back into the userProfile-memory
        await this.userProfile.set(step.context, user);

        return await step.endDialog();
    }

    // This step displays the captured information back to the user.
    async displayProfile(step) {
        // Get the state properties from the turn context.
        const user = await this.userProfile.get(step.context, {});
        if (user.age) {
            await step.context.sendActivity(`Your name is ${ user.name } and you are ${ user.age } years old.`);
        } else {
            await step.context.sendActivity(`Your name is ${ user.name } and you did not share your age.`);
        }
        return await step.endDialog();
    }

    /**
     * This function is called on each message or activity received from a user.
     * 
     * @param {TurnContext} turnContext A TurnContext object that will be interpreted and acted upon by the bot.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            // Create a dialog context object.
            const dc = await this.dialogs.createContext(turnContext);

            // preprocess the text-input from the user
            const utterance = nlp(turnContext.activity.text);

            // check for utterance 
            if (utterance.has('cancel')) {
                // check if there is currently an active dialog running
                if (dc.activeDialog) {
                    await dc.cancelAllDialogs();
                    await dc.context.sendActivity(`Ok... canceled.`);
                } else {
                    await dc.context.sendActivity(`Nothing to cancel.`);
                }
            }

            // If the bot has not yet responded, continue processing the current dialog.
            // this will 
            await dc.continueDialog();

            // On any input start the sample dialog if not already started
            if (!turnContext.responded) {
                const user = await this.userProfile.get(dc.context, {});

                // if we already completed the dialog to get user-input, return the info
                if (user.name) {
                    await dc.beginDialog(HELLO_USER);
                // otherwise start the dialog
                } else {
                    await dc.beginDialog(WHO_ARE_YOU);
                }
            }
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            // Do we have any new members added to the conversation?
            if (turnContext.activity.membersAdded.length !== 0) {
                // Iterate over all new members added to the conversation
                for (var idx in turnContext.activity.membersAdded) {
                    // Greet anyone that was not the target (recipient) of this message.
                    // Since the bot is the recipient for events from the channel,
                    // context.activity.membersAdded === context.activity.recipient.Id indicates the
                    // bot was added to the conversation, and the opposite indicates this is a user.
                    if (turnContext.activity.membersAdded[idx].id !== turnContext.activity.recipient.id) {
                        // Send a "this is what the bot does" message.
                        const description = "I am a bot to demonstrate conversations in multiple steps as well as memory. Say anything to continue.";
                        await turnContext.sendActivity(description);
                    }
                }
            }
        }

        // Save changes to the user state.
        await this.userState.saveChanges(turnContext);

        // End this turn by saving changes to the conversation state.
        await this.conversationState.saveChanges(turnContext);
    }
}

module.exports.DailogBot = DailogBot;
