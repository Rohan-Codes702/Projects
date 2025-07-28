const questions=[{
    question:"What is used to store data in a program?",
    answer:[
        {text:"Variables", correct:true},
        {text:"Functions", correct:false},
        {text:"Loops", correct:false},
        {text:"Conditions", correct:false},

    ]
},
{
    question: "Which keyword is used to make decisions?",
    answer:[
        {text:"for", correct:false},
        {text:"while", correct:false},
        {text:"switch", correct:false},
          {text:"if", correct:true}
    ]
},
{
    question:"Which is a collection of elements?",
    answer:[
        {text:"Array", correct:true},
        {text:"Function", correct:false},
        {text:"Variable", correct:false},
        {text:"Object", correct:false}
    ]
},
{
    question:"What is used to repeat code?",
    answer:[
        {text:"Variables", correct:false},
        {text:"Functions", correct:false},
         {text:"Loops", correct:true},
        {text:"Conditions", correct:false}
    ]
},

{
    question:"Which operator is used to compare values?",
    answer:[
        {text:"==", correct:true},
        {text:"=", correct:false},
        {text:"!=", correct:false},
        {text:">", correct:false}
    ]
},
{

question:" What type of error is caused by wrong syntax?",
answer:[
    {text:"Syntax Error", correct:true},
    {text:"Runtime Error", correct:false},
    {text:"Logical Error", correct:false},
    {text:"Type Error", correct:false}

]
},

{
    question:"What is a function that calls itself?",

    answer:[
        {text:"loop",correct:false},
        {text:"switch",correct:false},
        {text:"recursion",correct:true},
        {text:"Methods",correct:false},

    ]
},

{
    question:" What is used to define a function?",

    answer:[
        {text:"call",correct:false},
        {text:"Return",correct:false},
        {text:"void",correct:true},
        {text:"Define",correct:false},


    ]
},

{
    question:"js is a programming language used for?",
    answer:[
        {text:"Data Analysis",correct:false},
       {text:"Web Development",correct:true},
        {text:"Machine Learning",correct:false},
        {text:"Game Development",correct:false},

    ]
},
{
    question:"Which of the following is a JavaScript framework?",
    answer:[
        {text:"HTML", correct:false},
        {text:"CSS", correct:false},
         {text:"React", correct:true},
        {text:"Mongodb", correct:false}
    ]
}


];

const questionElement = document.getElementById("question");
const ansElement = document.getElementById("ans");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNO=currentQuestionIndex+1;
    questionElement.innerHTML=questionNO+"."+currentQuestion.question;
    
    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";

    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("inCorrect");
    }

    Array.from(ansElement.children).forEach(button=>{

        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}


function handlenextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}

function showScore() {
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handlenextButton();
  }
  else{
    startQuiz();
  }
});
startQuiz();

