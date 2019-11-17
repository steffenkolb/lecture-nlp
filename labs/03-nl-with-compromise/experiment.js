/**
 * Einführung in Natural Language Processing 2: Textanalyse
 **/

// Laden eines externen Moduls zur Vorverarbeitung des Textes und für den Zugriff auf Helper-Funktionen.
import * as helper from './src/helper';

// Laden des Textes in die NLP-Biblitothek
var doc = helper.getDoc();

/**
 * Hier findet ihr eure Aufgaben. Zur Lösung empfehle ich die Dokumentation unter https://github.com/spencermountain/compromise/wiki/QuickStart
 * Alle Ergebnisse speichert ihr in die Variable "result".
 * 
 * Die Ergebnisse werden dann automatisch auf der Website angezeigt.
 */

// Dies ist eure Ergebnisvariable
let result;

/**
 * Experiment 1: Wieviele Sätze hat der Text?
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 1
helper.outputResult(1, result);

/**
 * Experiment 2: Wieviele Verben?
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 2
helper.outputResult(2, result);

/**
 * Experiment 3: Verwandle den dritten Satz in die Vergangenheit.
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 3
helper.outputResult(3, result);

/**
 * Experiment 4: Liste die Top 50 Verben dieses Textes auf.
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 4
helper.outputFrequencyResult(4, result);

/**
 * Experiment 5: Welches sind die ersten fünf Fragen des Textes?
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 5
helper.outputResult(5, result);

/**
 * Experiment 6: Liste alle Personen des Textes auf, die mindestens 2 mal vorkommen.
 * Speichere deine Ergebnis in diese Variable.
 */
result = "???";

// Ausgabe des Ergebnises an Position 6
helper.outputFrequencyResult(6, result);