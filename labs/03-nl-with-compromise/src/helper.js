export function getDoc() {
    var nlp = require('compromise')
    // lade den Text
    var labText = document.getElementById("labText").value;
    return nlp(labText);
};

// Behilfsfunktion um ein Ergebnis auszugeben
export function outputResult(excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = result;
}

// Behilfsfunktion um eine Liste von Ergebnissen auszugeben
export function outputFrequencyResult (excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = "";

    // catch default value
    if(result == "???") {
        output.innerHTML = result;
    }

    result.forEach((m,i) => {
        output.innerHTML += m.normal + ": " + m.count + "\n";
    })
}