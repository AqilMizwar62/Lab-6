const questions = [
    {
        question: "Siapakah Bapa Kemerdekaan Malaysia?",
        options: ["Tun Abdul Razak", "Tunku Abdul Rahman", "Tun Hussein Onn", "Tun Dr. Mahathir"],
        correct: "Tunku Abdul Rahman"
    },
    {
        question: "Bilakah Malaysia mencapai kemerdekaan?",
        options: ["31 Ogos 1957", "16 September 1963", "31 Ogos 1963", "31 Disember 1957"],
        correct: "31 Ogos 1957"
    },
    {
        question: "Apakah nama perjanjian yang membawa kepada penubuhan Malaysia?",
        options: ["Perjanjian Bangkok", "Perjanjian Malaysia", "Perjanjian Persekutuan", "Perjanjian Manila"],
        correct: "Perjanjian Malaysia"
    },
    {
        question: "Siapakah yang digelar sebagai Bapa Malaysia?",
        options: ["Tun Abdul Razak", "Tunku Abdul Rahman", "Tun Dr. Ismail", "Tun Mahathir"],
        correct: "Tunku Abdul Rahman"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answeredQuestions = []; 

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timer); 
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback(false); 
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const answersList = document.getElementById("answers");
    answersList.innerHTML = ""; 

    questionData.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => {
            if (!answeredQuestions[currentQuestionIndex]) { 
                checkAnswer(option);
                answeredQuestions[currentQuestionIndex] = true;
            }
        };
        answersList.appendChild(li);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").disabled = !answeredQuestions[currentQuestionIndex]; 
    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0; 

    startTimer();
}

function checkAnswer(selected) {
    const questionData = questions[currentQuestionIndex];
    const isCorrect = selected === questionData.correct;

    if (isCorrect) score++;

    showFeedback(isCorrect);

    clearInterval(timer);

    document.getElementById("next-btn").disabled = false;
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = isCorrect ? "Jawapan Betul!" : "Jawapan Salah!";
    feedback.style.color = isCorrect ? "green" : "red";
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(); 
    } else {
        endQuiz(); 
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = [];
    document.getElementById("quiz-container").innerHTML = `
        <div id="timer">Masa: <span id="time">30</span>s</div>
        <div id="question-container">
            <p id="question"></p>
            <ul id="answers"></ul>
        </div>
        <div id="feedback"></div>
        <button id="prev-btn" onclick="prevQuestion()" disabled>Soalan Sebelumnya</button>
        <button id="next-btn" onclick="nextQuestion()" disabled>Soalan Seterusnya</button>
    `;
    displayQuestion();
}

function endQuiz() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Kuiz Tamat!</h2>
        <p>Markah Anda: ${score} / ${questions.length}</p>
        <button onclick="startQuiz()">Mulakan Semula</button>
    `;
}

startQuiz();
