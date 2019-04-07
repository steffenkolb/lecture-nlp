# Dialogs

von [Azure Bot Service Documentation](https://docs.microsoft.com/de-de/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0).

Dialoge sind ein zentrales Konzept im SDK und eine praktische Möglichkeit zum Verwalten einer Konversation mit dem Benutzer. Dialoge sind Strukturen in Ihrem Bot, die sich wie Funktionen im Programm des Bots verhalten. Jeder Dialog führt eine spezifische Aufgabe in einer bestimmten Reihenfolge aus. Sie können die Reihenfolge der einzelnen Dialoge festlegen, um die Konversation zu steuern, und die Dialoge auf unterschiedliche Weise aufrufen, z. B. als Antwort für einen Benutzer, als Reaktion auf externe Bedingungen oder über andere Dialoge.

## Dialogtypen

Wie in der unten stehenden Klassenhierarchie dargestellt, gibt es verschiedene Arten von Dialogen: Eingabeaufforderungen, Wasserfalldialoge und Komponentendialoge.

![Dailog Types](https://docs.microsoft.com/de-de/azure/bot-service/v4sdk/media/bot-builder-dialog-classes.png?view=azure-bot-service-4.0)

## Prompts

Prompts (zu deutsch Eingabeaufforderungen) bieten eine einfache Möglichkeit, den Benutzer nach Informationen zu fragen und deren Antwort auszuwerten. Bei einer Zahlenaufforderung geben Sie beispielsweise die Frage oder die Informationen an, nach denen Sie fragen möchten, und die Prompt prüft automatisch, ob sie eine gültige Nummernantwort erhalten hat. Wenn dies der Fall ist, kann das Gespräch fortgesetzt werden. Wenn dies nicht der Fall ist, wird der Benutzer erneut nach einer gültigen Antwort gefragt.

Technisch baut sich ein Prompt-Dialog aus zwei Schritten auf. Zuerst fordert ein Prompt zur Eingabe auf. Im zweiten Schritt gibt es den gültigen Wert zurück oder beginnt beginnt eine erneute Anfrage.

Eingabeaufforderungen werden beim Aufruf mit Optionen konfiguriert. Es wird der Text angeben, mit dem die Aufforderung angezeigt werden soll.

```javascript
// first we create a dialogset for the prompts
this.dialogs = new DialogSet(this.dialogState);

// then you specify a prompt
this.dialogs.add(new TextPrompt("What is your name"));
```

Die Wiederholungsaufforderung, falls die Überprüfung fehlschlägt;

```javascript
// first we create a dialogset for the prompts
this.dialogs = new DialogSet(this.dialogState);

// then we specify a NumberPrompt with age-validation
// these lines will check the values of the user before allowing the dialog to continue
this.dialogs.add(new NumberPrompt("How old are you", async (prompt) => {
    // first check if the user returned a number
    if (prompt.recognized.succeeded) {
        // then check if the age is valid
        if (prompt.recognized.value <= 0) {
            // specify the response if the validation fails
            await prompt.context.sendActivity(`Your age can't be less than zero.`);
            return false;
        } else {
            return true;
        }
    }
    return false;
}));
```

Oder Auswahlmöglichkeiten, um die Aufforderung zu beantworten.

```javascript
// first we create a dialogset for the prompts
this.dialogs = new DialogSet(this.dialogState);


```


Außerdem können Sie beim Erstellen der Eingabeaufforderung eine benutzerdefinierte Überprüfung für Ihre Eingabeaufforderung hinzufügen. Angenommen, wir wollten eine Gruppengröße über die Zahleneingabeaufforderung abrufen. Diese Gruppengröße muss jedoch mehr als 2 und weniger als 12 sein. Die Eingabeaufforderung prüft zuerst, ob sie eine gültige Nummer erhalten hat, und führt dann die benutzerdefinierte Überprüfung aus, falls es ist vorgesehen. Wenn die benutzerdefinierte Überprüfung fehlschlägt, wird der Benutzer wie oben erneut aufgefordert.
Wenn eine Eingabeaufforderung abgeschlossen ist, wird der angeforderte Ergebniswert explizit zurückgegeben. Wenn dieser Wert zurückgegeben wird, können wir sicher sein, dass er sowohl die integrierte Eingabeaufforderungsprüfung als auch alle zusätzlichen benutzerdefinierten Überprüfungen bestanden hat, die möglicherweise bereitgestellt wurden.

| Prompt | Description | Returns |
|--|--|--|
| Attachment prompt | Asks for one or more attachments, such as a document or image. | A collection of attachment objects. |
| Choice prompt | Asks for a choice from a set of options. | A found choice object. |
| Confirm prompt | Asks for a confirmation. | A Boolean value. |
| Date-time prompt | Asks for a date-time. | A collection of date-time resolution objects. |
| Number prompt | Asks for a number. | A numeric value. |
| Text prompt | Asks for general text input. | A string.|

## Waterfall-Dialogs

Ein Wasserfalldialog ist eine spezifische Implementierung eines Dialogs, die häufig verwendet wird, um Informationen vom Benutzer zu erfassen oder den Benutzer durch eine Reihe von Aufgaben zu leiten. Jeder Schritt der Konversation wird als eine asynchrone Funktion implementiert, die einen Parameter für den Wasserfallschrittkontext (`step`) akzeptiert.

![Waterfall dialog flow](https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/bot-builder-dialog-concept.png?view=azure-bot-service-4.0)

In Wasserfallschritten wird der Kontext des Wasserfalldialogs im *[WaterfallStepContext](https://docs.microsoft.com/en-us/javascript/api/botbuilder-dialogs/waterfallstepcontext?view=botbuilder-ts-latest)* gespeichert. Dieser ähnelt dem Dialogkontext, da er Zugriff auf den aktuellen Turn-Kontext und Zustand bietet. Verwenden Sie das Wasserfallschritt-Kontextobjekt, um aus einem Wasserfallschritt heraus mit einem Dialogsatz zu interagieren.

```javascript
async nameStep(stepContext) {
    // Create an object in which to collect the user's information within the dialog. We can use this information in subsequent steps.
    stepContext.values["user_info"] = {};

    // Ask the user to enter their name.
    return await stepContext.prompt(NAME_PROMPT, 'Please enter your name.');
}

async ageStep(stepContext) {
    // fetch user-name from previous step, where we asked for the name
    var name = stepContext.result;

    // then set the user's name to the one she entered before
    stepContext.values["user_info"].name = name;

    // Next we ask the user for her age
    return await stepContext.prompt(AGE_PROMPT, 'Please enter your age.');
}
```

### Eigenschaften des Wasserfallschrittkontexts

Der Wasserfallschrittkontext enthält Folgendes:

* Options: Eingabeinformationen für den Dialog.
* Values: Informationen, die dem Kontext hinzugefügt werden können und in nachfolgenden Schritten übernommen werden.
* Result: Das Ergebnis des vorherigen Schritts.

Zudem ist die `next`-Methode verfügbar, die den Dialog mit dem nächsten Schritt des Wasserfalldialogs innerhalb desselben Turns fortsetzt, sodass Ihr Bot bei Bedarf einen bestimmten Schritt überspringen kann.