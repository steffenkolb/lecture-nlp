import * as helper from './helper';

var doc = helper.getDoc();
let result;

// solution 1: Wieviele Sätze hat der Text?
result = doc.sentences().length;
helper.outputResult(1, result);

// solution 2: Wieviele Verben?
result = doc.verbs().length;
helper.outputResult(2, result);

// solution 3: Verwandle den dritten Satz in die Vergangenheit.
result = doc.sentences(2).toPastTense().out('text');
helper.outputResult(3, result);

// solution 4: Liste die Top 50 Verben dieses Textes auf.
result = doc.verbs().out('frequency').slice(0,50);
helper.outputFrequencyResult(4, result);

// solution 5: Welches sind die ersten fünf Fragen des Textes?
result = doc.questions().slice(0,5).out('text');
helper.outputResult(5, result);

// solution 6: Liste alle Personen des Textes auf, die mindestens 2 mal vorkommen.
result = doc.people().sort('frequency').out('frequency').filter((m,i) => m.count >= 2);
helper.outputFrequencyResult(6, result);