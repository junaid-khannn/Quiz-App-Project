const questions = [
{
  question : "What is the largest Animal in the World",
  answeres:[
    {text:"Shark",correct:"false"},
    {text:"Blue whale",correct:"true"},
    {text:"Elephant",correct:"false"},
    {text:"Giraffe",correct:"false"},
  ]
},
{
  question : "What is the Capital of Pakistan",
  answeres:[
    {text:"Lahore",correct:"false"},
    {text:"Islamabad",correct:"true"},
    {text:"Karachi",correct:"false"},
    {text:"Rawalpindi",correct:"false"},
  ]
},
{
  question : "In which Country Effel Tower Located?",
  answeres:[
    {text:"India",correct:"false"},
    {text:"France",correct:"true"},
    {text:"Canada",correct:"false"},
    {text:"USA",correct:"false"},
  ]
},
{
  question : "In Which Country the Most Expensive Mango is Cultivated?",
  answeres:[
    {text:"Indonesia",correct:"false"},
    {text:"Japan",correct:"true"},
    {text:"China",correct:"false"},
    {text:"Malaysia",correct:"false"},
  ]
}

];



const questionElement = document.getElementById("question");
const answerebutton = document.getElementById("answere-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;

let score = 0;

function startQuiz()
{
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion()
{
  resetState();

   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex +1;
   questionElement.innerHTML = questionNo + "." + currentQuestion.question;


   currentQuestion.answeres.forEach(answer=>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerebutton.appendChild(button);

    if(answer.correct)
      {
          button.dataset.correct = answer.correct;
      }

    button.addEventListener("click",selectAnswer);
   });

   function resetState()
   {
    nextButton.style.display = "none";
    while(answerebutton.firstChild)
      {
        answerebutton.removeChild(answerebutton.firstChild)
      }
   }

   function selectAnswer(e)
   {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";

      if(isCorrect)
        {
          selectedBtn.classList.add("correct");
          score++;
        }else
        {
          selectedBtn.classList.add("incorrect");
        }

        Array.from(answerebutton.children).forEach(button=>{

          if(button.dataset.correct==="true")
            {
              button.classList.add("correct");
            }
             button.disabled = true;
        });

        nextButton.style.display = "block";
   }



   function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


   function handleNextButton()
   {
      currentQuestionIndex++;
      if(currentQuestionIndex < questions.length)
        {
            showQuestion();
        }else
        {
            showScore();
        }
   }

   nextButton.addEventListener("click",()=>{

        if(currentQuestionIndex < questions.length)
          {
             handleNextButton();
          }else
          {
            startQuiz();
          }


   })
}


startQuiz();