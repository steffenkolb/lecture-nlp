# NLP Chatbot

Auch bei unserem zweiten Chatbot nutzen wir das Microsoft [Bot Framework][1].
Bei diesem Bot benutzen wir ein internes Gedächtnis des Bots,
welches Informationen über mehrere Nachrichten hinweg behält.

Zusätzlich werden wir externe Resourcen ansprechen und somit Webservices abrufen
und IoT-Devices über den Chatbot ansteuern.

Die Übung setzt folgende Resourcen vorraus (zu finden im Ordner `resources` des Projekts):

- Eine Internetverbindung zum Abruf der aktuellen Uhrzeit
- Webservice zum Abruf der Temperatur auf http://localhost:1880/temp
- MQTT-Broker zum Ansprechen der IoT-Devices auf http://localhost:1883

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

- Installiere den Bot Framework Emulator der Version 4.6.0 or höher von [hier][6]

### Verbinde den Bot und den Bot Framework Emulator

- Starte den Bot [über NPM](#Bot-starten)
- Starte die Bot Framework Emulator Anwendung
- Gehe zu `File -> Open Bot Configuration`
- Navigiere zum `05-iot-bot`-Ordner
- Wähle die `iot-bot.bot`-Dateu

## Weitere Informationen

- Compromise Syntax Matching: [Tutorial](https://observablehq.com/@spencermountain/compromise-match-syntax), [Documentation](https://github.com/spencermountain/compromise/wiki/Match-Syntax)
- [Building a Bot with Compromise](https://observablehq.com/@spencermountain/compromise-making-a-bot)
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
[20]: https://docs.botframework.com
[21]: https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0
[22]: https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0
[30]: https://www.npmjs.com/package/restify
[31]: https://www.npmjs.com/package/dotenv
[32]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0
[40]: https://aka.ms/azuredeployment
[41]: ./PREREQUISITES.md
