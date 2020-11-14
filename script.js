
window.onload = function() {
///////////////////////////////////////
  //these need to be reset to original values to restart quiz without refreshing page
  // function quizReset does this around line 130;
  let questionNumber = 0;
  let time = 120; //2 minutes;
  let numberCorrect = 0; 
  let timerOn = true;
  let initials = "";


  let questions = [
   { question: "-----This question will not appear-----", answer: "-----This will not be used-----"},
   { question: "Javascript is a case-sensitive language.", answer: "T"},
    { question: "jQuery is a programming language", answer: "F"},
    { question: "You can parse strings to integer values in javascript", answer: "T"},
    { question: "Stringify is a JSON method", answer: "T"},
    { question: "Bootstrap is a javascript runtime", answer: "F"},
    { question: "Parse is a JSON method", answer: "T"},
    { question: "-----end-----", answer: "-----This will not be used------"}
   ];
   
   // - - - - - - - -
   let startButton = document.getElementById("start-btn");
   let questionDiv = document.getElementById("question-div");
   let currentItemHeading = document.getElementById("current-item-heading");
   const tfDiv = document.getElementById("tf-div");
   const pageContainer = document.getElementById("page-container");
   let timeDiv = document.getElementById("time-div");
   let numberCorrectDiv = document.getElementById("number-correct-div");

   //This function should run when it's time for the next question.
   let showNextQuestion = function(){
      numberCorrectDiv.innerHTML = '<p><b>Number correct: </b> <span class="stat number-correct">' + numberCorrect +
      '</span></p><p><b>Number answered: </b><span class="stat">' + (parseInt(questionNumber)) +  '</span></p>';

      questionNumber++;
      let q = questions[questionNumber];
      if(q.question == "-----end-----"){
         gameComplete();
         return false;        
      }
      trueOrFalse = q.answer;
      currentItemHeading.textContent = `Question ${questionNumber}`;
      questionDiv.textContent =  q.question;     
   }

   //This function should run when the game is complete
   let gameComplete = function(){

      pageContainer.classList.add("game-result");
      questionDiv.classList.add("game-result");

      timerOn = false;
      initials = "-" + prompt(`Enter your 3 letter initials to save with your score: `);
       if(initials == " " || initials == " null"){
         initials = "Unknown";
      } 

      initials = initials.substring(1,4);
      initials = initials.toUpperCase();
      alert("Initials saved as:  \n " + initials);
      
      currentItemHeading.textContent = "Quiz Results";
      let numberOfQuestions = questions.length -2;
      let percentScore = (100 * (numberCorrect / numberOfQuestions)).toString(); // could have repeating decimals;
      percentScore = percentScore.substring(0,4) + "%" ;
      console.log(percentScore)
      questionDiv.innerHTML = "<p> <b>Final Score: </b> " + percentScore + "</p> <p><b> Initials:</b> " + initials + " </p>";

      if(numberCorrect > 0) {
         questionDiv.innerHTML = questionDiv.innerHTML +   " <p> Well done! </p>";
      } else{
         questionDiv.innerHTML = questionDiv.innerHTML +   " <p> Study and try again! </p>";
      }

      // save scrore and initials to local storage
      localStorage.setItem("initials", initials);
      localStorage.setItem("percentScore", percentScore);

      //make true/false buttons display:none;
       //  remove display:none from Start Quiz button;
      tfDiv.classList.add("d-none");
      startButton.classList.remove("d-none");
       // update Start Quiz button text to "Restart Quiz"
       startButton.textContent = "Restart Quiz";
   } //END of gameComplete function ~~~~~~~~~~~~~~~~~~~~~~~~;

   // correct and incorrect functions carry out standard actions for each type of user response. 
   //This should run if user's quiz response is incorrect
   var incorrect = function(){
      console.log("Incorrect");
      alert("Incorrect.  \n 30 seconds will be substracted from the remaining time");
      time = parseInt(time) - 30;
   }
   //This should run if user's quiz response is correct.
   var correct = function(){
      numberCorrect = numberCorrect + 1;
      console.log(numberCorrect);
   }

  // True false button event handler
   tfDiv.addEventListener("click", function(event) {
      event.preventDefault();
      // cq is the current question
      let cq = questions[questionNumber];
      if(event.target.matches("button")) {
        // Correct answer is True.
         if(cq.answer == "T"){
            if(event.target.id == "true-div"){
               correct();
            }
            else if(event.target.id == "false-div"){
               incorrect();
           }
         }
          // Correct answer is False.
         if(cq.answer == "F"){
               if(event.target.id == "true-div"){
                incorrect();
               }
               else if(event.target.id == "false-div"){
                correct();
            }
         }
      showNextQuestion();
      }  // end of: "target is button"
   });

   // Funciton to reset  global variables to initial values 
   let quizReset = function(){
       questionNumber = 0;
       time = 120; //2 minutes;
       numberCorrect = 0; 
       timerOn = true;
       initials = "";
       pageContainer.classList.remove("game-result");
       questionDiv.classList.remove("game-result");
       
   }

   // Game start function
   startButton.addEventListener("click", function(event) {
      event.preventDefault();
      if(event.target.matches("button")) {
         quizReset();
         showNextQuestion();
          tfDiv.classList.remove("d-none");
          startButton.classList.add("d-none");

          let gameTimer = window.setInterval(function(){
            if(timerOn != true){
               clearInterval(gameTimer);
            }

            time = parseInt(time) - 1; 
            timeDiv.innerHTML = '<p><b>Seconds remaining: </b>  <span class="stat seconds-remaining"> <span class="highlight">' + time  + '</span> </span></p>';
          
            if(time <= 0){
               gameComplete();
               clearInterval(gameTimer);
            }
         }, 1000);
      }
   });

/* ---------------------------------------------
------------------------------------------------
GENERIC CSS/JS/HTML MODAL (FOR SAVED USER SCORE)
------------------------------------------------
----------------------------------------------*/

// get the mPopup
var mpopup = document.getElementById('mpopupBox');

// get the link that opens the mPopup
var mpLink = document.getElementById("mpopupLink");

// get the close action element
var close = document.getElementsByClassName("close")[0];

// open the mPopup once the link is clicked
mpLink.onclick = function() {
    mpopup.style.display = "block";
    updateSavedScores();
 }

// close the mPopup once close element is clicked
close.onclick = function() {
    mpopup.style.display = "none";
}

// close the mPopup when user clicks outside of the box
window.onclick = function(event) {
    if (event.target == mpopup) {
        mpopup.style.display = "none";
    }
}

/* ----------------------------------------
  / END MODAL 
--------------------------------------------*/


/* ------------------------------------------------
---------------------------------------------------
Function to add local storage values to modal form
---------------------------------------------------
--------------------------------------------------*/
   let updateSavedScores = function() {
         let savedInits = localStorage.getItem("initials");
         console.log(savedInits);
         let savedScore = localStorage.getItem("percentScore");
         console.log(savedScore);
      let initialsGoHere = document.getElementById("initials-go-here");
      let scoresGoHere = document.getElementById("scores-go-here");
      initialsGoHere.textContent = savedInits;
      scoresGoHere.textContent = savedScore;
   }
} //end window onload