const questions = [
    {
        question: "How long is a full soccer game, at the professional level?",
        answers: [
            {text: "45 Minutes", correct: false},
            {text: "60 Minutes", correct: false},
            {text: "30 Minutes", correct: false},
            {text: "90 Minutes", correct: true},
        ]
    },
    {
        question: "All of which can guarantee a foul, except?",
        answers: [
            {text: "Bad Behavior", correct: false},
            {text: "Bumping into another player while chasing the ball", correct: true},
            {text: "Aggressively pushing another player", correct: false},
            {text: "Intentionally Kicking Another Player", correct: false},
        ]
    },
    {
        question: "Which country won the first ever FIFA World Cup in 1930?",
        answers: [
            {text: "Uruguay", correct: true},
            {text: "South America", correct: false},
            {text: "Portugal", correct: false},
            {text: "Russia", correct: false},
        ]
    },
    {
        question: "Which country has won the most World Cups?",
        answers: [
            {text: "United States", correct: false},
            {text: "Japan", correct: false},
            {text: "Brazil", correct: true},
            {text: "Argentina", correct: false},
        ]
    },
    {
        question: "What is the maximum number of substitutions allowed in a standard FIFA match?",
        answers: [
            {text: "Four", correct: false},
            {text: "Five", correct: true},
            {text: "Six", correct: false},
            {text: "Three", correct: true},
        ]
    },
    {
        question: "Which club has won the most UEFA Champions League titles?",
        answers: [
            {text: "Chelsea", correct: false},
            {text: "Real Madrid", correct: true},
            {text: "Liverpool", correct: false},
            {text: "Inter", correct: false},
        ]
    },
    {
        question: "What is the name of the award given to the top scorer in a World Cup tournament?",
        answers: [
            {text: "Golden Boot", correct: true},
            {text: "Crown Of Soccer", correct: false},
            {text: "Medal Of Honor", correct: false},
            {text: "Goal Medal", correct: false},
        ]
    },
    {
        question: "Which club is considered the oldest professional football club in the world?",
        answers: [
            {text: "Manchester United", correct: false},
            {text: "FC Barcelona", correct: false},
            {text: "Real Madrid", correct: false},
            {text: "Sheffield F.C.", correct: true},
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
        window.location.replace("techniques.html", "_blank");
    }
})

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        startQuiz();
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