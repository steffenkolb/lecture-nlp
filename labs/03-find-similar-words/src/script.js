let word2Vec;

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    btnSubmit.disabled = false;
}

function setup() {
    // nothing to see here
    noLoop();
    noCanvas();

    // html references
    let outputElement = select("#output");
    let btnSubmit = select("#btnSubmit");
    let yourWordElement = select("#yourWord");


    // Create a new word2vec method
    const wordVectors = ml5.word2vec(./data/wordvecs10000.json, modelLoaded);          

    btnSubmit.mousePressed(() => {
    // reset output
    outputElement.html("");

    // Find the closest to your word
    let word = yourWordElement.value();
    wordVectors.nearest(word, function(err, results) {
        console.log(results);

        // write each word into the output-console
        results.forEach(element => {
        // add word to end of column
        outputElement.html(element["word"], true);
        outputElement.html("\n", true);
        });
    });  
    });
}