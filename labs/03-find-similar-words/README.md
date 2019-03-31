# Einführung in NLP 2: Ähnliche Wörter finden

In dieser Übung nutzen wir zum ersten mal Regeln, welche durch Machine Learning Methoden erzeugt wurden.
Hierfür verwenden wir die Machine Learning Bibliothek [ml5js](https://ml5js.org).
Diese Bibliothek kann bereits vordefinierte Regeln benutzen.

Im ersten Teil versuchen wir lediglich das Experiment zu starten und die Bibliothek zu verwenden.
Falls dies problemlos möglich ist, könnt ihr versuchen das Experiment der [ml5js-Dokumentation](https://ml5js.org/docs/word2vec-example) nachzustellen.

## Installation

Damit diese Übgung funktioniert, müssen die Regeln heruntergeladen werden.

- Lade das Word2Vec-Model unter https://github.com/ml5js/ml5-examples/blob/master/p5js/Word2Vec/data/wordvecs10000.json herunter
- Speichere die Datei im `static`-Ordner dieses Experiments

ML5js-Experimente können leider nicht über Parcel gestartet werden.
Deshalb müssen wir einen weiteren Webserver installieren. Dies geschieht wie gewohnt über NPM:

```bash
npm install
```

## Das Experiment starten

Das Experiment starten wir nun wie gewohnt über npm:

```bash
cd C:\Projekt\Ordner
npm run start
```

Danach ist die Übung über einen Webbrowser der Wahl unter folgender Addresse erreichbar:
[http://localhost:8080](http://localhost:8080)