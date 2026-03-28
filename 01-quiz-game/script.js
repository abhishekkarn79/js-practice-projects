// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// DOM Elements
const startScreen = document.querySelector('#start-screen');
const startBtn = document.querySelector('#start-btn');
const quizScreen = document.querySelector('#quiz-screen');
const questionText = document.querySelector('#question-text');
const currentQuestionElem = document.querySelector('#current-question');
const totalQuestionsElem = document.querySelector('#total-questions'); 
const scoreElem = document.querySelector('#score');
const answersContainer = document.querySelector('#answers-container');
const progressElem = document.querySelector('#progress');
const resultScreen = document.querySelector('#result-screen');
const resultMsg = document.querySelector('#result-message');
const currentScoreElem = document.querySelector('#score');
const finalScoreElem = document.querySelector('#final-score');
const maxScoreElem = document.querySelector('#max-score');
const restartBtn = document.querySelector('#restart-btn');


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsElem.textContent = quizQuestions.length;
maxScoreElem.textContent = quizQuestions.length;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElem.textContent = score;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionElem.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressElem.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if (button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if (isCorrect){
        score++;
        scoreElem.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults(){
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreElem.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMsg.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80){
        resultMsg.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60){
        resultMsg.textContent = "Goof effort! Keep learning!";
    } else if (percentage >= 40){
        resultMsg.textContent = "Not bad! Try again to improve!";
    } else {
        resultMsg.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    scoreElem.textContent = 0;
    resultScreen.classList.remove("active");
    startQuiz();
}


startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
