var nlp = require('compromise')

var labText = document.getElementById("labText").value;

function outputResult(excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = result;
}

function outputFrequencyResult(excercise, result) {
    let id = "output_"+excercise;
    let output = document.getElementById(id);
    output.innerHTML = "";

    result.forEach((m,i) => {
        output.innerHTML += m.normal + ": " + m.count + "\n";
    })
}