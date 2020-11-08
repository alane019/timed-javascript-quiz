
window.onload = function() {

///////////////////////////////////////

   let questionNumber = 0;
  /* const questionArray = [
   {
   "Is JavaScript a case-sensitive language?",
   "Is jQuery a programming language?",
   "Can you parse strings to interger values in javascript?"   
   ]; */

  let questions = [
   { question: "This question will not appear.", answer: "This will not be used"},
   { question: "Javascript is a case-sensitive language.", answer: "T"},
    { question: "jQuery is a programming language", answer: "F"},
    { question: "You can parse strings to interger values in javascript?", answer: "T"},
    { question: "Stringify is a JSON method", answer: "T"},
    { question: "Bootstrap is a programming language", answer: "F"},
    { question: "Parse is a JSON method", answer: "T"}
   ];

  //[not needed] let quizState = "ready"
   //[not needed] let startButton = document.getElementById("start-btn-div");
   let startButtonDiv = document.getElementById("start-btn");
   let questionDiv = document.getElementById("question-div");
   let currentItemHeading = document.getElementById("current-item-heading");

   const trueDiv = document.getElementById("true-div");
   const falseDiv = document.getElementById("false-div");
   const tfDiv = document.getElementById("tf-div");
   /*
      <div id="time-div" class=""></div>
    <div id="number-correct" class=""></div>
   */
  let time = 120000; //2 minutes;
  let numberCorrect = 0; 
   const timeDiv = document.getElementById("time-div");
   const numberCorrectDiv = document.getElementById("number-correct-div");

   
   trueOrFalse = "";

   let showNextQuestion = function (){
      questionNumber++;
      //let displayNumber = questionNumber + 1;
      let q = questions[questionNumber];
      trueOrFalse = q.answer;
      currentItemHeading.textContent = `Question ${questionNumber}`;
      questionDiv.textContent =  q.question;
            //update tfStatus based on tfAnswerDataArray....
   }

  // True false button event handler
   tfDiv.addEventListener("click", function(event) {
      event.preventDefault();
      // cq is the current question
      let cq = questions[questionNumber];
      if(event.target.matches("button")) {
        // [OK: message appears when button clicked]  alert("clicked");
         if(cq.answer == "T"){
            if(event.target.id == "true-div"){
                console.log("Correct");
                numberCorrect++;
                numberCorrectDiv = numberCorrect;
            }
            else if(event.target.id == "false-div"){
               console.log("Incorrect");
               time = time - 30000;
           }
         }
         /////
         if(cq.answer == "F"){
               if(event.target.id == "true-div"){
                  console.log("Incorrect");
               }
               else if(event.target.id == "false-div"){
                  console.log("Correct");
                  numberCorrect++;
                  numberCorrectDiv = numberCorrect;
            }
         }
      }  // end of: "target is button"
      showNextQuestion();
   });


   startButtonDiv.addEventListener("click", function(event) {
      event.preventDefault();
      if(event.target.matches("button")) {
        // [OK: message appears when button clicked]  alert("clicked");
         showNextQuestion();
         startButtonDiv.classList.add("d-none");
          //[not needed]  startButton.visibility = "hidden";
          tfDiv.classList.remove("d-none");
          startButtonDiv.classList.add("d-none");
       // var item = document.createElement("div");
       // item.textContent = groceries[event.target.parentElement.id];
       // shoppingCartEl.append(item);
      }
   });

   /* 
   
   while (answerList.firstChild) {
         answerList.removeChild(answerList.firstChild);
      }
   */
} //end window onload