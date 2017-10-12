//Global Variables

var question
var correct = 0;
var incorrect = 0;
var rightAnswer;
var wrongAnswer;
var userGuess = "";
var gameScore;
var currentQuestion = 0;
var startButton;
var btn
var btn2
var btn3
var btn4

var uCategory = localStorage.getItem("category");
var uLevel = localStorage.getItem("difficulty");
var qAmount = localStorage.getItem("amount");




//ajax call to trivia api with user's selected variables plugged in.
$.ajax({
   url: "https://opentdb.com/api.php?amount=" + qAmount + "&category=" + uCategory + "&difficulty=" + uLevel + "&type=multiple",
   type: "GET"
}).done(function(response) {
    console.log(response);
    
    

    //these if statements make the background change depending on the category the user chooses. 
    if (uCategory == 11) {
        $('body').css('backgroundImage', 'url(assets/images/movies.jpg)');
        $('#title').html("<h1>Movie Trivia</h1>");
    } else if (uCategory == 12) {
        $('body').css('backgroundImage', 'url(assets/images/music.jpg)');
        $('#title').html("<h1>Music Trivia</h1>");
    } else if(uCategory==14){
        $('body').css('backgroundImage', 'url(assets/images/tv.jpg)');
        $('#title').html("<h1>TV Show Trivia</h1>");
    }





    gameStart();

    //This function creates a start button that calls the displayQuestion fucntion and the checkAnswer function.
    function gameStart() {

        //create a variable that holds the start button
        startButton = $("<btn>")
        //give it a class and add the text play to the button
        startButton.addClass("btn btn-danger col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2").text("Play");
        //push the button to the html question div
        $("#questions").html(startButton);
        //create a click event that calls the first question.
        $(startButton).on("click", function() {
            displayQuestion();
        });


    }
    //this function updates the score in the html
    function scoreValidation(){
        $("#correct").html(" Points: "+ correct+ "<br/>")
        $("#incorrect").html("Incorrect: "+ incorrect)
    }


    function displayQuestion() {

        if(currentQuestion==9){

        }

        //create a variable that holds the first trivia question
        question = response.results[currentQuestion].question;

        //create a variable that holds the correct answer
        rightAnswer = response.results[currentQuestion].correct_answer;

        //create a variable that holds the wrong answers
        wrongAnswer = response.results[currentQuestion].incorrect_answers;


        //print one question out per page.
        $("#questions").html(question + "<br/><br/>");

        //put the answers in an array
        var choices = [response.results[currentQuestion].incorrect_answers[0], response.results[currentQuestion].incorrect_answers[1], response.results[currentQuestion].incorrect_answers[2], response.results[currentQuestion].correct_answer]
        console.log(choices);

        //the sort method makes everything print out alphabetically, which automatically randomizes the order of the answers.
        var randomizeAnswers = choices.sort();

        //print each answer onto the screen in its own div.

        btn = $("<btn>");
        btn.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[0]);


        $("#answer1").html(btn);

        btn2 = $("<btn>");
        btn2.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[1]);


        $("#answer2").html(btn2)

        btn3 = $("<btn>");
        btn3.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[2]);


        $("#answer3").html(btn3)

        btn4 = $("<btn>");
        btn4.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[3]);


        $("#answer4").html(btn4)

    }



    //click events on each answer to determine the user's choice

    $("#answer1").on("click", function() {
        userGuess = $("#answer1").text().trim();
        console.log("onclick currentQuestion value: " + currentQuestion);
        console.log("The user clicked button 1");
        score();
    });

    $("#answer2").on("click", function() {
        userGuess = $("#answer2").text().trim();
        console.log("onclick currentQuestion value: " + currentQuestion);
        console.log("The user clicked button 2");
        score();
    });

    $("#answer3").on("click", function() {
        userGuess = $("#answer3").text().trim();
        console.log("onclick currentQuestion value: " + currentQuestion);
        console.log("The user clicked button 3");
        score();
    });

    $("#answer4").on("click", function() {
        userGuess = $("#answer4").text().trim();
        console.log("onclick currentQuestion value: " + currentQuestion);
        console.log("The user clicked button 4");
        score();

    });
    console.log("currentQuestion value: " + currentQuestion);




    //give buttons an attribute- if attribute === right answer coorect++    


    //create a click event that calls the next question
    //store the results (score) in variables.

    function score() {
        console.log("this is the userGuess: " + userGuess);
        console.log("this is the right answer: " + rightAnswer);

        if (uLevel == "easy" && userGuess == rightAnswer) {
            correct++;
            console.log(correct + "is correct");
            currentQuestion++;
            userGuess = "";
            scoreValidation();
            displayQuestion();
        } else if (uLevel == "medium" && userGuess == rightAnswer) {
            correct += 2;
            console.log(correct + "is correct");
            currentQuestion++;
            userGuess = "";
            scoreValidation();
            displayQuestion();
        } else if (uLevel == "hard" && userGuess == rightAnswer) {
            correct += 3;
            console.log(correct + "is correct");
            currentQuestion++;
            userGuess = "";
            scoreValidation();
            displayQuestion();
        } else {
            incorrect++;
            console.log(incorrect + "is incorrect");
            currentQuestion++;
            userGuess = "";
            scoreValidation();
            displayQuestion();
        }
    }

    //**the variables to plug into firebase is correct 

    //when your done summarize score
    //two options- button to play again, or go to ranking page,
    //log out button
      //firebase.database().ref().push({
         


    //problem description:
    //the game will use the button the user clicked for their second guess and use it for their third guess, it will then ask the user the third question despite having already recorded an answer and records a second answer for the same question. Then, on the fourth question, the computer will use the button the user clicked for the third question and use that button to answer the fourth question twice. 

    //cause
    //you were putting the onClick event handlers in a function and calling the function, which is redundant because event handlers are already called by the event.
    //  
    //


});