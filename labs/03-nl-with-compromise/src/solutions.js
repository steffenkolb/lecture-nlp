import * as helper from './helper';

var doc = helper.getDoc();
let result;

// solution 1: Wieviele Sätze hat der Text?
// --> 417
result = doc.sentences().length;
helper.outputResult(1, result);

// solution 2: Wieviele Verben?
// --> 572
result = doc.verbs().length;
helper.outputResult(2, result);

// solution 3: Verwandle den dritten Satz in die Vergangenheit.
// --> Hey, what were you doing?
result = doc.sentences(2).toPastTense().out('text');
helper.outputResult(3, result);

// solution 4: Liste die Top 50 Verben dieses Textes auf.
// --> is: 50; are: 26; am: 16; know: 14; ...
result = doc.verbs().out('frequency').slice(0,50);
helper.outputFrequencyResult(4, result);

// solution 5: Welches sind die ersten fünf Fragen des Textes?
// --> Hey, what are you doing?
// --> So what did you two do about it?
// --> But really, it does seem like this money could be put to better use?
// --> Are you serious?
// --> Now, how would you feel if we gave all the wedding money to charity    and we just got married at City Hall?
result = doc.questions().slice(0,5).out('text');
helper.outputResult(5, result);

// solution 6: Liste alle Personen des Textes auf, die mindestens 2 mal vorkommen.
// --> bert: 10
// --> emma: 8
// --> ross: 6
// --> guy: 6
// --> joey: 4
// --> laura: 3
// --> monica: 2
// --> ernie: 2
result = doc.people().out('frequency').filter((m) => m.count >= 2);
helper.outputFrequencyResult(6, result);