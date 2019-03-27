/**
 * Einführung in Natural Language Processing 2: Textanalyse
 * 
 * Die folgenden Zeilen beschreiben den Setup des Experiments.
 * Eure Aufgabe und Lösungen findet ihr in Abschnitt 2.
 **/

var nlp = require('compromise')

// lade den Text
var labText = document.getElementById("labText").value;

// Behilfsfunktion um ein Ergebnis auszugeben
function outputResult(excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = result;
}

// Behilfsfunktion um eine Liste von Ergebnissen auszugeben
function outputFrequencyResult(excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = "";

    result.forEach((m,i) => {
        output.innerHTML += m.normal + ": " + m.count + "\n";
    })
}

// Laden des Textes in die NLP-Biblitothek
var doc = nlp(labText);

/**
 * ABSCHNITT 2:
 * Hier findet ihr eure Aufgaben. Zur Lösung empfehle ich die Dokumentation unter https://github.com/spencermountain/compromise/wiki/QuickStart
 * Alle Ergebnisse speichert ihr in die Variable "result".
 * 
 * Die Ergebnisse werden dann automatisch auf der Website angezeigt.
 */

// Dies ist eure Ergebnisvariable
let result;

// experiment 1: Wieviele Sätze hat der Text?
result = "???";
outputResult(1, result);


// experiment 2: Wieviele Verben?
result = "???";
outputResult(2, result);

// experiment 3: Verwandle den dritten Satz in die Vergangenheit.
result = "???";
outputResult(3, result);

// experiment 4: Liste die Top 50 Verben dieses Textes auf.
result = "???";
outputFrequencyResult(4, result);

// experiment 5: Welches sind die ersten fünf Fragen des Textes?
result = "???";
outputResult(5, result);

// experiment 6: Liste alle Personen des Textes auf, die mindestens 2 mal vorkommen.
result = "???";
outputFrequencyResult(6, result); /**/