$(document).ready(function () {

    var questionCounter = 0;
    var time = 15;
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var questions = [
        {
            question: "Which sister is NOT a Kardashian?",
            choices: ["Kourtney", "Kylie", "Kim", "Kandy"],
            correctAnswer: "Kandy",
            image: "<img src='assets/images/kardashian.jpg' class='img-circle'>"
        },
        {
            question: "Which rapper is Kyle Jenner currently dating?",
            choices: ["Tyga", "Travis Scott", "Kanye West", "Lil Wayne"],
            correctAnswer: "Travis Scott",
            image: "<img src='assets/images/Kyliebf.jpg' class='img-circle'>"
        },
        {
            question: "Which of the Kardashian kids belong to Kim?",
            choices: ["North", "Stormi", "True", "Penelope"],
            correctAnswer: "North",
            image: "<img src='assets/images/NorthWest.jpg' class='img-circle'>"
        },
        {
            question: "Which channel does Keeping Up with the Kardashians air on?",
            choices: ["E!", "ABC", "Bravo", "ESPN"],
            correctAnswer: "E!",
            image: "<img src='assets/images/E!.jpg' class='img-circle'>"
        }];


    function questionContent() {
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }

    //correct answer selection
    function userWin() {
        $("#gameScreen").html("<p>Correct!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    // incorrect answer selection
    function userLoss() {
        $("#gameScreen").html("<p>Sorry, that is not right.</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    //time up
    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<p>Time is up</p>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" +
                correctAnswer +
                "</span></p>" +
                questions[questionCounter].image);
            setTimeout(nextQuestion, 4000);
            questionCounter++;
        }
    }

    //final score screen
    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "Great job, you know your pop culture.";
            var bottomText = "Kardashian Expert!";
        }
        else if (correctGuesses > incorrectGuesses) {
            var endMessage = "Nice job but you have area to imporve.";
            var bottomText = "On your way to Kardashian expert.";
        }
        else {
            var endMessage = "Not quite a Kardashian expert.";
            var bottomText = "Keep trying";
        }
        $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
            correctGuesses + "</strong> right.</p>" +
            "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
        $("#bottomText").html(bottomText);
        gameReset();
        $("#start").click(nextQuestion);
    }

    //game clock set to 15 seconds
    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }

    //moves question counter forward to show next question
    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }

    }

    //reset score and counter parameters on restart
    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
    }

    function startGame() {
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $("#start").hide();
        questionContent();
        timer();
        userTimeout();
    }

    //starts the game
    $("#start").click(nextQuestion);

    //click function to trigger right or wrong screen
    $("#gameScreen").on("click", ".choices", (function () {
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});