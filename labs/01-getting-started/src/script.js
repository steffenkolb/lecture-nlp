// Load library
import words from 'talisman/tokenizers/words';
import porter from 'talisman/stemmers/porter';
import levenshtein from 'talisman/metrics/distance/levenshtein';

document.getElementById("tokenizationInput").addEventListener('input', (el, ev) => {
    let input = document.getElementById("tokenizationInput").value;
    let result = words(input);
    
    document.getElementById("tokenizationOutput").innerHTML = result;
})

document.getElementById("stemmingInput").addEventListener('input', (el, ev) => {
    let input = document.getElementById("stemmingInput").value;
    let result = porter(input);
    
    document.getElementById("stemmingOutput").innerHTML = result;
})

document.getElementById("distBtn").addEventListener('click', (el, ev) => {
    let inputOne = document.getElementById("distInputOne").value;
    let inputTwo = document.getElementById("distInputTwo").value;
    let result = levenshtein(inputOne, inputTwo);
    
    document.getElementById("distOutput").innerHTML = result;
})