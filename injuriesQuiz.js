const questions = [
    {
        question: "What is the most common soccer injury?",
        answers: [
            {text: "Head Concussion", correct: false},
            {text: "Leg Bone Fracture", correct: false},
            {text: "Sprains", correct: true},
            {text: "Blindness", correct: false},
        ]
    },
    {
        question: "What is the most important method to prevent injury?",
        answers: [
            {text: "No preparation need, just play the game", correct: false},
            {text: "Warming up and stretching properly", correct: true},
            {text: "Drink a lot of water", correct: false},
            {text: "Get motivation advice from the coach", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("quizNextButton")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetQuestion();
    let currQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currQuestion.question;

    currQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answerButton");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetQuestion() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    }); 
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        window.location.replace("final.html", "_blank");
    }
})

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetQuestion();
    questionElement.innerHTML = `Grade: ${score}/${questions.length}!`;
    questionElement.style.fontSize = "40px";
    nextButton.innerHTML = "Next";
    nextButton.style.display = "block";
}

startQuiz();