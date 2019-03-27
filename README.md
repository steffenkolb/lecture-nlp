# AI meets IoT: Natural Language Processing

## Voraussetzungen

- Computer mit einem Browser
- Terminal (zum Beispiel [CMDER](http://cmder.net) für Windows oder [iTerm](https://www.iterm2.com) für MacOS)
- [Node.js](http://nodejs.org)
- [Visual Studio Code](https://code.visualstudio.com)

## Vorbereitungen

### Repository herunterladen

Ladet euch zunächst dieses Repository herunter. Dies geht über folgenden Link: https://github.com/steffenkolb/lecture-nlp/archive/master.zip
Entpackt das Archiv und verschiebt es an einen Ort eurer Wahl. Im Archiv findet ihr genau diese `REAMDE.md`-Datei wieder.

### Webserver installieren

Um die Übungen lokal auszuführen, ist es notwendig die Dateien über einen Webserver bereitzustellen.

Wir benutzen hierfür [Parcel](https://parceljs.org). Das Programm generieren die Dateien der Website und stellt diese durch einen Webserver zur Verfügung. Um das Programm nutzen zu können installieren wir `Parcel` am besten betriebssystemweit.

```bash
npm install -g parcel-bundler
```

## Aufbau der Experimente

Sämtliche Übungen sind im Ordner `labs` zu finden. Zu jedem Experimente findet ihre eine eigene `README.md` Datei.
Dort ist die Installation und der Start eines Experiments beschrieben.

## Quellen

### Theorie

- Handbook of Natural Language Processing, Chapman & Hall, CRC Press 2010
- [SWR2 Wissen: Aula - Digitale Wunderwelt - Kontrolliert künstliche Intelligenz den Menschen? (23.2.2019)](https://itunes.apple.com/de/podcast/swr2-wissen/id104913043?mt=2&i=1000430467096)
- [Natural Language Processing is Fun!, Adam Geitgey, 2018](https://medium.com/@ageitgey/natural-language-processing-is-fun-9a0bff37854e)
- [Wikipedia: Mehrdeutigkeit](https://de.wikipedia.org/wiki/Mehrdeutigkeit#Mehrdeutigkeit_lexikalischer_Zeichen)

### Coding

- [Parcel: web application bundling](https://parceljs.org)
- [compromise: Basic NLP library](https://compromise.cool)
- [ml5js: Machine Learning in the Browser](https://ml5js.org)
- [ml5js + Word2Vec: NLP in the Browser](https://ml5js.org/docs/word2vec-example)
