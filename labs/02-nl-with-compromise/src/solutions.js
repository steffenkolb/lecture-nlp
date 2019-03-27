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

var doc = nlp(labText);
let result;

// solution 1
result = doc.sentences().length;
outputResult(1, result);

// solution 2
result = doc.verbs().length;
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