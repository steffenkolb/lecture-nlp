# NLP mit LUIS

Dieser Bot kombinitert das [Bot Framework][1] mit der [LUIS][11], dem Natural Language Understanding Service.
LUIS klassifiziert Nachrichten nach einer Reihe vordefinierter Absichten (Intents).  Dies ermöglich eine realistischere und organischere Kommunikation zwischen dem Bot und dem Benutzer.

**Wichtig**: Du hast nur *5000 Erkennungen* pro Monat frei. Versuche also nicht unnötig viele Anfragen an den LUIS zu stellen und nutze soweit sinnvoll `compromise`.

## Vorraussetzungen

- [Node.js][4] der Version 8.5 oder höher

    ```bash
    # determine node version
    node --version
    ```

- [Bot Framework Emulator][5]

## LUIS Anwendung erstellen und Verknüpfen

### Verknüpfe LUIS.ai mit deinem Microsoft Account

1. Besuche [www.luis.ai](http://www.luis.ai )
2. Logge dich mit deinem `@hfg-gmuend`-Account ein
3. Wähle `Personal Account` falls du gefragt wirst
4. Erlaube den Zugriff von Luis-Ai auf deine Account-Daten
5. Danach wirst du auf die Luis.ai-Seite zurückgeleitet
6. Wähle die Country/Region (`Germany`)
7. Akzeptiere die Nutzungsbedingungen und drücke `Continue`
8. Fertig du bist bei Luis-Ai angemeldet

### LUIS Anwendung erstellen

1. Wähle „+ Create New App“
2. Konfiguriere die Anwendung
    1. Name (`LuisBot`)
    2. Culture (`English`)
    3. Description (`My personal test chatbot`)
3. Drücke auf `Done`
4. Wähle die neu erstellte Anwendung `LuisBot`
5. Erstelle einen Intent unter `Intents` und dann `+ Create new intent`
6. Gib deinem Intent einen Namen (`Time_Current`)
7. Erstelle fünf Varianten, wie jemand nach der Uhrzeit fragen könnte
    - Info: Nach jeder Variante mit `Enter` bestätigen
8. Gehe im Menü links auf `Entities` und lege mit `+ Create new entity` eine Entität an
    - Name (`Product`)
    - Entitype type (`Simple`)
    - Drücke `Done`
9. Wähle dann im Menü wieder `Intents` und lege einen einen neuen Intent mit dem Namen `Shopping_Order` an
10. Erstelle wiederum fünf Varianten; diesmal, wie ein Benutzer ein Produkt bestellen könnte
    - Beispiel `I would like to have a pizza`
    - Markiere bei jeder Variante das Produkt (im Beispiel: `pizza`) und wähle die Entität `Product`
    - Das eigentlich Produkt wird damit ersetzt (`I would like to have a Product`)
    - Das ermöglicht es im Bot auf das eigentliche Produkt Bezug zu nehmen
11. Drücke abschließend auf `Train` oben in der Leiste um die Anwendung zu trainieren
    - **Wichtig**: Immer wenn du Änderungen an den `Intents` oder `Entities` der Anwendung gemacht hast, musst du diese neu Trainieren über `Train`

### LUIS Anwendung mit ChatBot verknüpfen

1. Ist das Training erfolgreiche drücke auf `Publish`
2. Im Fenster wähle ein Environment (`Production`) und drücke `Publish`
    - **Wichtig**: Immer wenn du die Anwendung erneut trainiert hast, musst du diese über `Publish` neu veröffentlichen bevor die Änderungen wirksam werden
3. Wechsle in der Menüleiste über `MANAGE` zum Untermenüpunkt `Application Information`
    1. Kopiere dir die `Application ID`
4. Wechsle danach zum Untermenüpunkt `Azure Resources`
    1. Kopiere den `Primary key`
    2. Und abschließend aus derselben Liste die Region (`westus`)
5. Setze die Werte in deine `.env`-Datei ein

    ```properties
    botFilePath=nlp-with-luis.bot

    LuisAppId=Application ID
    LuisAPIKey=Primary key
    LuisRegion=Region
    ```

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
- Navigiere zum `07-nlp-wth-luis`-Ordner
- Wähle die `nlp-with-luis.bot`-Datei

## LUIS

Language Understanding service (LUIS) allows your application to understand what a person wants in their own words. LUIS uses machine learning to allow developers to build applications that can receive user input in natural language and extract meaning from it.

Der Spracherkennungsdienst (LUIS) ermöglicht deiner Anwendung zu verstehen, was ein Benutzer ausdrücken möchte. LUIS verwendet Machine Learning um Benutzereingaben in natürlicher Sprache empfangen und daraus Bedeutungen ableiten zu können.

## Aufgaben

Verbessere die Fähigkeiten des Bots aus Übung 04 mithilfe von LUIS.
Nutze Entities um besser auf die Eingaben antworten zu können.

1. Bringe deinem Bot eine Begrüßung bei
2. Lass ihn einen Witz erzählen
3. Ermögliche dem Bot „persönliche“ Fragen zu beantworten
    - Lieblingsessen, -song, -vorlesung, …
    - Stimmung, Hobbies, …

## Weitere Informationen

- [Language Understanding using LUIS][11]
- [Using LUIS for Language Understanding][23]
- [LUIS documentation][24]
- [Activity processing][15]
- [Bot Framework Documentation][20]
- [Bot Basics][32]
- [Azure Bot Service Introduction][21]
- [Azure Bot Service Documentation][22]
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
[23]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-luis?view=azure-bot-service-4.0&tabs=js
[24]: https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/
[27]: https://github.com/microsoft/botbuilder-js/tree/master/libraries/botbuilder-dialogs
[30]: https://www.npmjs.com/package/restify
[31]: https://www.npmjs.com/package/dotenv
[32]: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0
[40]: https://aka.ms/azuredeployment
