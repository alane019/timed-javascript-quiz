
window.onload = function() {
///////////////////////////////////////

  let questions = [
   { question: "This question will not appear.", answer: "This will not be used"},
   { question: "Javascript is a case-sensitive language.", answer: "T"},
    { question: "jQuery is a programming language", answer: "F"},
    { question: "You can parse strings to interger values in javascript?", answer: "T"},
    { question: "Stringify is a JSON method", answer: "T"},
    { question: "Bootstrap is a programming language", answer: "F"},
    { question: "Parse is a JSON method", answer: "T"},
    { question: "end", answer: "This will not be used"}
   ];

  //[not needed] let quizState = "ready"
   //[not needed] let startButton = document.getElementById("start-btn-div");
   let startButtonDiv = document.getElementById("start-btn");
   let questionDiv = document.getElementById("question-div");
   let currentItemHeading = document.getElementById("current-item-heading");
   const trueDiv = document.getElementById("true-div");
   const falseDiv = document.getElementById("false-div");
   const tfDiv = document.getElementById("tf-div");
   const pageContainer = document.getElementById("pageContainer");

  let questionNumber = 0;
  let time = 120; //2 minutes;
  let timeDiv = document.getElementById("time-div");
  let numberCorrect = 0; 
  let numberCorrectDiv = document.getElementById("number-correct-div");
  let timerOn = true;
  let trueOrFalse = "";
  let initials = "";


   let showNextQuestion = function(){
      questionNumber++;
      let q = questions[questionNumber];
      if(q.question == "end"){
         gameComplete();
         return false;        
      }
      trueOrFalse = q.answer;
      currentItemHeading.textContent = `Question ${questionNumber}`;
      questionDiv.textContent =  q.question;     
   }

   let gameComplete = function(){
      pageContainer.style.backgroundColor = "rgb(32, 154, 24, 0.28)";
      timerOn = false;
      initials = prompt(`Enter your initials to save with score: `)
      currentItemHeading.textContent = "Game complete!";
      questionDiv.innerHTML = "<p>FINAL SCORE: " + numberCorrect + "</p> <p> Initials: " + initials + " </p> <p>   Good job! </p>";
      localStorage.setItem("initials", initials);
      localStorage.setItem("score", numberCorrect);
   
   }

   // correct and incorrect functions
   var incorrect = function(){
      console.log("Incorrect");
      alert("Incorrect.  \n 30 seconds will be substracted from the remaining time");
      time = parseInt(time) - 30;
   }

   var correct = function(){
      numberCorrect = numberCorrect + 1;
      console.log(numberCorrect);
      numberCorrectDiv.textContent = "Number correct: " + numberCorrect;
      console.log("Correct");
    //  alert("Correct.");
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
      }  // end of: "target is button"
      showNextQuestion();
   });


   // Game start function
   startButtonDiv.addEventListener("click", function(event) {
      event.preventDefault();
      if(event.target.matches("button")) {
        // [OK: message appears when button clicked]  alert("clicked");
         showNextQuestion();
         startButtonDiv.classList.add("d-none");
          //[not needed]  startButton.visibility = "hidden";
          tfDiv.classList.remove("d-none");
          startButtonDiv.classList.add("d-none");

          let gameTimer = window.setInterval(function(){
            if(timerOn != true){
               clearInterval(gameTimer);
            }

            time = parseInt(time) - 1; 
            timeDiv.textContent = "Seconds remaining: " + time;
            numberCorrectDiv.textContent = "Number correct: " + numberCorrect;

            if(time == 0){
               gameComplete();
               clearInterval(gameTimer);
            }
      
         }, 1000);
      
      }
   });

   

   /* 
   while (answerList.firstChild) {
         answerList.removeChild(answerList.firstChild);
      }
   */

} //end window onload