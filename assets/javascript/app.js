
var disneyQuestions = [
    {
        question: "Who was the original Disney Princess?",
        answers: ["Cinderella", "Snow White", "Sleeping Beauty", "Pocahontas"],
        correct: 1,
        gifOne: "./assets/images/snowwhite.gif",
        gifTwo: "./assets/images/sadsnow.gif",
    },
    {
        question: "Who is missing from this list? Dopey, Doc, Happy, Sneezy, Bashful, Sleepy...",
        answers: ["Grumpy", "Angry", "Jumpy", "Stumpy"],
        correct: 0,
        gifOne: "./assets/images/grumpy1.gif",
        gifTwo: "./assets/images/grumpy2.gif",
    },
    {
        question: "Who is Ariel's father?",
        answers: ["King Trident", "King Neptune", "King Triton", "King Posideon"],
        correct: 2,
        gifOne: "./assets/images/kingt1.gif",
        gifTwo: "./assets/images/kingt2.gif",
    },
    {
        question: "How did Sleeping Beauty fall into a deep sleep?",
        answers: ["Fell into a well", "ate a poison apple", "got hit in the head with a baseball", "pricked her finger on a spindel"],
        correct: 3,
        gifOne: "./assets/images/spindle1.jpg",
        gifTwo: "./assets/images/spindle2.gif",
    },
    {
        question: "Which Princess lost a glass slipper at a ball?",
        answers: ["Snow White", "Aurora", "Cinderella", "Jasmine"],
        correct: 2,
        gifOne: "./assets/images/cindy1.gif",
        gifTwo: "./assets/images/cindy2.gif",
    },
]

var answersCorrect;
var answersWrong;
var gameTotal = 5;
var currentQuestion;
var timer;
var timeToGuess;
var timerTen = 10;
var timerThree = 3;
var library;
library = disneyQuestions.slice();



$(document).ready(function () {


    //Functions start
    
        $("#new-game").on("click", function newGame() {
             
        answersCorrect = 0;
        answersWrong = 0;
        $("#question").empty();
        
        newQuestion();
        
        

        // $("#new-game").on("click", function startGame() {
        //     $("#new-game").hide();
        //     $("#results").hide();
        //     newQuestion();
        // });
    });

    function newQuestion() {
        $("#gif").hide();
        
        $("#new-game").hide();
        $(".beginning").hide();
        $("#score").hide();
        $("#answer0").off().on("click", guess);
        $("#answer1").off().on("click", guess);
        $("#answer2").off().on("click", guess);
        $("#answer3").off().on("click", guess);

         
        if (answersCorrect + answersWrong == gameTotal) {
            gameOver();
        } else {
            
            var questionNumber = Math.floor(Math.random() * library.length);
            currentQuestion = library[questionNumber];
            library.splice(questionNumber, 1);
            resetTimer();
            $("#question").text(currentQuestion.question);
            $("#answer0").text(currentQuestion.answers[0]);
            $("#answer1").text(currentQuestion.answers[1]);
            $("#answer2").text(currentQuestion.answers[2]);
            $("#answer3").text(currentQuestion.answers[3]);
            timer = setInterval(showTimer, 1000);
            $("#correct-answer").empty();
            
        }
    }

    function guess() {
        
        if ($(this).data("choice") === currentQuestion.correct) {
            $("#answer0").empty();
        $("#answer1").empty();
        $("#answer2").empty();
        $("#answer3").empty();
            answersCorrect++;
            $("#correct-answer").text("Correct! " + currentQuestion.answers[currentQuestion.correct] + " was the correct answer.", "correctResult");
            $("#gif").show();
            $("#gif").html("<img src ="+ currentQuestion.gifOne + " >");
            resetTimer();
            setTimeout(newQuestion, timerThree * 1000);

        } else {
            $("#answer0").empty();
        $("#answer1").empty();
        $("#answer2").empty();
        $("#answer3").empty();
            answersWrong++;
            $("#correct-answer").text("Wrong. " + currentQuestion.answers[currentQuestion.correct] + " was the correct answer.", "wrongResult");
            $("#gif").show();
            $("#gif").html("<img src ="+ currentQuestion.gifTwo + " >");
            resetTimer();
            setTimeout(newQuestion, timerThree * 1000);
        };

    };

    function gameOver() {
        
        $("#beginning").hide();
        $("#score").show();
        $("#timer").hide();
        $("#correct-answer").empty();
        $("#question").empty();

        $("#answer0").hide();
        $("#answer1").hide();
        $("#answer2").hide();
        $("#answer3").hide();
        console.log(answersCorrect);
        console.log(answersWrong);
        

        if (3 <= answersCorrect) {
            $("#results").text(answersCorrect + " correct out of 5! Good Job!")
        }
        else {
            $("#results").text(answersWrong + " wrong out of 5... You know nothing about Disney. I feel sorry for you.")
        };
        $("#new-game").show();
        $("#new-game").on("click", function(){
            $("#question").empty();
            newGame();
        });

        


    }


    //Timer Info
    function showTimer() {
        if (timeToGuess >= 0) {
            $("#timer").html(timeToGuess + " seconds left");
            timeToGuess--;
        } else {
            timesUp();
        }
    }
    function timesUp() {
       
        $("#answer0").empty();
        $("#answer1").empty();
        $("#answer2").empty();
        $("#answer3").empty();
        answersWrong++;
        resetTimer();
        setTimeout(newQuestion, timerThree * 1000);
        $("#correct-answer").text("Time's Up! The correct answer was " + currentQuestion.answers[currentQuestion.correct], "timesUp");
        $("#gif").show();
            $("#gif").html("<img src ="+ currentQuestion.gifTwo + " >");
            resetTimer();
    }
    function resetTimer() {
        clearInterval(timer);
        timeToGuess = timerTen;
        $("#timer").empty();
    }

});



