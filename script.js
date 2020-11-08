

window.onload = function() {

   const questions = ["Is JavaScript a case-sensitive language?", " ...?"];

   const answers =  ["Yes, JavaScript is a case sensitive language.", "...?"];
   
   let quizState = "ready"

   



   




   let buttonDiv = document.getElementById("button-div");
   buttonDiv.addEventListener("click", function(event) {
      event.preventDefault();
      if(event.target.matches("button")) {
        // [OK: message appears when button clicked]  alert("clicked");


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

