//Create variables 

var time = 15;
var interval = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayInfo = 0;

//Variables with each question's data.
var question01 = {
    question: "What's the highest moutain in North America?",
    answers: ["Mt. Whitney", "El Captain", "Denali", "Mt Foraker"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Denali",
    image: "assets/images/denali.jpg"
};
var question02 = {
    question: "what's the highest mountain in South America?",
    answers: ["Mt. Aconcagua", "Ojos del Salado", "Pissis", "Cazadero"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Mt. Aconcagua",
    image: "assets/images/aconcagua.jpg"
};
var question03 = {
    question: "What's the highest peak in Antarctica?",
    answers: ["Mt. Minto", "Mt. Kirkpatrick", "Mt. Vinson", "Mt. Paris"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Mt. Vinson",
    image: "assets/images/vinson.jpg"
};
var question04 = {
    question: "What's the highest peak in Europe?",
    answers: ["Mont Blanc", "Mt. Elbrus", "Eiger", "Mount Olympus"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Mt. Elbrus",
    image: "assets/images/elbrus.jpg"
};
var question05 = {
    question: "What's the highest pesk in Australia?",
    answers: ["Mount Kosciuszko", "Thorton Peak", "St Mary Peak", "Mount Anne"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Mount Kosciuszko",
    image: "assets/images/kosciuszko.jpeg"
};
var question06 = {
    question: "What's the highest peak in Africa?",
    answers: ["Mount Kenya", "Mount Kilimanjaro", "Mount Meru", "Mount Baker"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Mount Kilimanjaro",
    image: "assets/images/kilimanjaro.jpg"
};
var question07 = {
    question: "What's the highest peak in Asia?",
    answers: ["K2", "Makalu", "Nanda Devi", "Everest"],
    values: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "Everest",
    image: "assets/images/everest2.jpg"
};

//Variable holding the array
var questionsArray = [question01, question02, question03, question04, question05, question06, question07];

// Functions

function start () {
    //Make sure the div is empty before starting
    $(".content").empty();
    //Create var to add button within the div
    var startButton = $("<button>");
    // Give the button the text "Start"
    startButton.text("Start");
    // Add bootstrap classes to it.
    startButton.addClass("start btn btn-default answerBtn");
    // Appends the "start button" to the div.
    $(".content").append(startButton);
};

// setInterval function
function run() {
    interval = setInterval(decrement, 1000);
};


function decrement() {
    time--;
    $(".timer").html("Time remaining: " + time + "seconds");
    if (time == 0) {
        if (arrayInfo < questionsArray.length-1) {
            setTimeout(function () {questionWrite(questionsArray[arrayInfo])}, 3000);
            solutionWrite(questionsArray[arrayInfo]);
            $(".question").html("Incorrect");
            stop();
            unanswered++;
        }
        else if (arrayInfo < questionsArray.length) {
            setTimeout(function() {endWrite(questionsArray[arrayInfo])}, 3000);
            solutionWrite(questionsArray[arrayInfo]);
            $(".question").html("Incorrect");
            stop();
            unanswered++;
        }
    };
};

function stop() {
    clearInterval(interval);
};

function questionWrite (object) {
    time = 15;
    $(".timer").empty();
    $(".timer").html("Time remaining: " + time + "seconds");
    $(".question").empty();
    $(".content").empty();
    run ();
    $(".question").html(object.question);
    
    for (var i = 0; i < object.answers.length; i++) {
        var answerButton = $("<button>");
        answerButton.addClass("answer btn btn-default answerBtn");
        answerButton.text(object.answers[i]);
        answerButton.attr("value", object.values[i]);
        $(".content").append(answerButton);
        $(".content").append("<br>");

    };
};

function solutionWrite (object) {
    $(".question").empty();
    $(".content").empty();
    $(".content").html("The correct answer is " + object.correct + "<br>");
    var mountainImage = $("<img>");
    mountainImage.attr("height", "250");
    mountainImage.attr("width", "400");
    mountainImage.attr("src", object.image);
    mountainImage.addClass("mountain");
    $(".content").append(mountainImage);
    arrayInfo++;
};
   
function startWrite () {
    questionWrite(question01);
};

function answerSelect () {
    stop ();
    if ($(this).attr("value") == "correct") {
        solutionWrite(questionsArray[arrayInfo]);
        $(".question").html("Correct");
        correct++;
        if (arrayInfo < questionsArray.length) {
            setTimeout(function () {questionWrite(questionsArray[arrayInfo])}, 3000);
        }
        else if (arrayInfo < questionsArray.length+1) {
            setTimeout (function () {endWrite(questionsArray[arrayInfo])}, 3000);
        }
    }
    else if ($(this).attr("value") == "incorrect") {
        solutionWrite(questionsArray[arrayInfo]);
        $(".question").html("Incorrect");
        incorrect++;
        if (arrayInfo < questionsArray.length) {
            setTimeout(function () {questionWrite(questionsArray[arrayInfo])}, 3000);
        }
        else if (arrayInfo < questionsArray.length+1) {
            setTimeout(function () {endWrite(questionsArray[arrayInfo])}, 3000);
        }
    }
};

function endWrite () {
    $(".question").empty();
    $(".content").empty();
    $(".question").html("Here are the results!");
    $(".content").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
    var resetButton = $("<button>");
    resetButton.addClass("reset btn btn-default answerBtn");
    resetButton.text("Start Over?");
    $(".content").append(resetButton);

};

function resetClick () {
    arrayInfo = 0;
    incorrect = 0;
    correct = 0;
    unanswered = 0;
    startWrite();
};

$(document).on("click", ".start", startWrite);

$(document).on("click", ".answer", answerSelect);

$(document).on("click", ".reset", resetClick);

start();




