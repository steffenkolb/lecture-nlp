var doc = nlp(labText);
let result;

// solution 1
result = doc.sentences().length;
outputResult(1, result);

// solution 2
result = doc.nouns().length;
outputResult(2, result);

// solution 3
result = doc.sentences().slice(3,4).toPastTense().out();
outputResult(3, result);

// solution 4
result = doc.verbs().slice(0, 50).out('frequency');
outputFrequencyResult(4, result);

// solution 5
result = doc.questions().slice(0,5).out('text');
outputResult(5, result);

// solution 6
result = doc.people().sort('frequency').out('frequency').filter((m,i) => m.count >= 2);
outputFrequencyResult(6, result); /**/