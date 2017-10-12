$(document).ready(function() {

    //global variables
    var qAmount = $("#trivia_amount").val();
    var uCategory = $("#trivia_category").val();
    var uLevel = $('#trivia_difficulty').val();
    var URL = "https://opentdb.com/api.php?";

    //clear previous local storage game data.
    localStorage.removeItem("amount");
    localStorage.removeItem("category");
    localStorage.removeItem("difficulty");

    var responseData;
    $("#btnSubmit").on("click", function(event) {
        event.preventDefault();

       if (qAmount==10 ) {
            $('#myModal').modal('show');
            // Focus the email rather than mypassword (which doesn't exist)
        } else {


            //var qAmount = $("#trivia_amount").val();
            //var uCategory = $("#trivia_category").val();
            //var uLevel = $('#trivia_difficulty').val();

            //set the game Parameter data to local storage
            localStorage.setItem("amount", qAmount);
            localStorage.setItem("category", uCategory);
            localStorage.setItem("difficulty", uLevel);

            //turns the submit button into a link for the game page.
            location.href = "game.html";

        }


    });



});

//});