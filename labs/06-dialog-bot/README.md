# NLP Chatbot

Dieser Bot nutzt erweiterte Dialogfähigkeiten des [Bot Frameworks][1].
Es sind bereits erste Interaktionen mit dem Benutzer integriert, die beliebig erweitert werden können.

## Vorraussetzungen

- [Node.js][4] der Version 8.5 oder höher

    ```bash
    # determine node version
    node --version
    ```

- [Bot Framework Emulator][5]

## Bot starten

- Node Module installieren

    ```bash
    npm install
    ```

- Den Bot starten

    ```bash
    npm start
    ```

## Den Bot mit dem Bot Framework Emulator testen

[Bot Framework Emulator][5] ist eine Desktop-Anwendung welche sich mit dem Bot verbindet und somit einen interaktiven Test ermöglicht.

- Installiere den Bot Framework Emulator der Version 4.2.0 or höher von [hier][6]

### Verbinde den Bot und den Bot Framework Emulator

- Starte den Bot [über NPM](#Bot-starten)
- Starte die Bot Framework Emulator Anwendung
- Gehe zu `File -> Open Bot Configuration`
- Navigiere zum `06-dialog-bot`-Ordner
- Wähle die `dialog-bot.bot`-Datei

## Dialoge

Eine Konversation zwischen einem Bot und einem Benutzer besteht aus der Aufforderungen (See [Dialogs](Dialogs.md)) nach Informationen an den Benutzers, die Analyse der Antwort des Benutzers, und dann der Reaktion auf diese Informationen. In diesem Beispiel wird veranschaulicht, wie Benutzer mithilfe der verschiedenen Aufforderungstypen zur Eingabe von Informationen aufgefordert werden.

Wir nutzen die Bibliothek [botbuilder-dialogs][27] des SDKs.
Die Bibliothek enthält eine Reihe von vordefinierten Eingabeaufforderungsklassen, einschließlich Text, Anzahl und Datetime-Typen. Das Beispiel demonstriert die Verwendung einer Textaufforderung zum Abrufen des Benutzernamens und die Verwendung einer Zahlenabfrage zum Abrufen des Alters.

## Aufgaben

1. Bring dem Bot bei zwei verschiedene "Knock Knock"-Witze zu erzählen
    - [Though Catalog 40 Ridiculous ‘Knock Knock’ Jokes](https://thoughtcatalog.com/melanie-berliet/2015/09/40-ridiculous-knock-knock-jokes-thatll-get-you-a-laugh-on-demand/)

2. Nutze den Bot um eine Bewerbungsgespräch durchzuführen. Wechsle zwischen verschiedenen Fragetypen. Minimum fünf Fragen.
    - Fange mit Standard-Fragen an (Name, Alter, ...)
    - [Swiss Miss Favorite Interview Questions](https://www.swiss-miss.com/2017/07/my-favorite-interview-questions.html)
    - Ermögliche dem Bewerber nach dem Interview die gespeicherten Antworten abzufragen

## Weitere Informationen

- [Managing State – Bot Memory][23]
- [Prompt types][12]
- [Waterfall dialogs][13]
- [Ask the user questions][14]
- [Activity processing][15]
- [Bot Framework Documentation][20]
- [Bot Basics][32]
- [Azure Bot Service Introduction][21]
- [Azure Bot Service Documentation][22]
- [Language Understanding using LUIS][11]
- [Restify][30]
- [dotenv][31]

[1]: https://dev.botframework.com
[2]: https://www.typescriptlang.org
[3]: https://www.typescriptlang.org/#download-links
[4]: https://nodejs.org
[5]: https://github.com/microsoft/botframework-emulator
[6]: https://github.com/Microsoft/BotFramework-Emulator/releases
[7]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[8]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest
[9]: https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot
[10]: https://portal.azure.com
[11]: https://www.luis.ai
[12]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0&tabs=javascript
[13]: https://docs.microsoft.com/en-us/javascript/api/botbuilder-dialogs/waterfall
[14]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-waterfall?view=azure-bot-service-4.0&tabs=jstab
[15]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0
[20]: https://docs.botframework.com
[21]: https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0
[22]: https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0
[23]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-state?view=azure-bot-service-4.0
[27]: https://github.com/microsoft/botbuilder-js/tree/master/libraries/botbuilder-dialogs
[30]: https://www.npmjs.com/package/restify
[31]: https://www.npmjs.com/package/dotenv
[32]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0
[40]: https://aka.ms/azuredeployment