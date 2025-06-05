const allQuestions = [
  // HTML Questions
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0, category: "html" },
  { question: "Which HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>"], answer: 1, category: "html" },
  { question: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h1>", "<head>"], answer: 1, category: "html" },
  { question: "How do you start an ordered list in HTML?", options: ["<ul>", "<ol>", "<li>"], answer: 1, category: "html" },
  { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>"], answer: 1, category: "html" },
  { question: "Which tag is used to define a table row?", options: ["<tr>", "<td>", "<table>"], answer: 0, category: "html" },
  { question: "Which HTML element is used to specify a footer?", options: ["<footer>", "<bottom>", "<section>"], answer: 0, category: "html" },
  { question: "Which attribute is used in HTML to provide an alternate text for an image?", options: ["alt", "title", "src"], answer: 0, category: "html" },
  { question: "Which tag is used to embed a video in HTML?", options: ["<media>", "<video>", "<movie>"], answer: 1, category: "html" },
  { question: "How can you make a list that lists the items with bullets?", options: ["<ul>", "<ol>", "<dl>"], answer: 0, category: "html" },
  { question: "What is the purpose of the 'head' tag in HTML?", options: ["To display headings", "To store metadata", "To style elements"], answer: 1, category: "html" },
  { question: "Which HTML tag is used for inserting a horizontal rule?", options: ["<hr>", "<line>", "<rule>"], answer: 0, category: "html" },
  { question: "Which HTML tag is used to display preformatted text?", options: ["<code>", "<pre>", "<text>"], answer: 1, category: "html" },
  { question: "How do you make a checkbox in HTML?", options: ["<checkbox>", "<input type='checkbox'>", "<check>"], answer: 1, category: "html" },
  { question: "What is the purpose of the <nav> element?", options: ["Navigation links", "Footer", "Side content"], answer: 0, category: "html" },
  { question: "Which tag is used to define a list item?", options: ["<item>", "<list>", "<li>"], answer: 2, category: "html" },
  { question: "Who is making the Web standards?", options: ["The World Wide Web Consortium", "Google", "Mozilla"], answer: 0, category: "html" },
  { question: "What is the correct HTML for adding a background color?", options: ["<body style='background-color:yellow;'>", "<background>yellow</background>", "<body bg='yellow'>"], answer: 0, category: "html" },

  // CSS Questions
  { question: "What does CSS stand for?", options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System"], answer: 1, category: "css" },
  { question: "Which property is used to change background color in CSS?", options: ["color", "bgcolor", "background-color"], answer: 2, category: "css" },
  { question: "Which symbol is used for comments in CSS?", options: ["//", "<!-- -->", "/* */"], answer: 2, category: "css" },
  { question: "What is the correct syntax to link an external stylesheet?", options: ["<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<stylesheet>style.css</stylesheet>"], answer: 1, category: "css" },
  { question: "Which CSS property controls the text size?", options: ["text-size", "font-style", "font-size"], answer: 2, category: "css" },
  { question: "Which selector is used to select all elements of a given class?", options: [".classname", "#classname", "*classname"], answer: 0, category: "css" },
  { question: "What is Bootstrap?", options: ["A JavaScript framework", "A database", "A CSS framework"], answer: 2, category: "css" },
  { question: "How do you select an element by ID in CSS?", options: [".id", "#id", "*id"], answer: 1, category: "css" },

  // JavaScript Questions
  { question: "Which language is used to add interactivity to web pages?", options: ["HTML", "CSS", "JavaScript"], answer: 2, category: "js" },
  { question: "How do you create a function in JavaScript?", options: ["function = myFunction()", "function myFunction()", "create myFunction()"], answer: 1, category: "js" },
  { question: "Inside which HTML element do we put the JavaScript?", options: ["<script>", "<js>", "<javascript>"], answer: 0, category: "js" },
  { question: "How do you write 'Hello World' in an alert box in JavaScript?", options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');"], answer: 2, category: "js" },
  { question: "How do you write a comment in JavaScript?", options: ["<!-- comment -->", "// comment", "** comment **"], answer: 1, category: "js" },
  { question: "What does JSON stand for?", options: ["Java Syntax Object Notation", "JavaScript Object Notation", "Java Source Object Notation"], answer: 1, category: "js" },
  { question: "Which method can be used to round a number in JavaScript?", options: ["Math.round()", "Math.rnd()", "Math.integer()"], answer: 0, category: "js" },
  { question: "How do you define a variable in JavaScript?", options: ["v x = 5;", "var x = 5;", "x = 5;"], answer: 1, category: "js" },
  { question: "How do you include JavaScript in an HTML document?", options: ["<js>", "<javascript>", "<script>"], answer: 2, category: "js" },
  { question: "Which function is used to print in the console in JavaScript?", options: ["console.log()", "print()", "log.console()"], answer: 0, category: "js" },
  { question: "Which of the following is a JavaScript data type?", options: ["number", "decimal", "real"], answer: 0, category: "js" },
];

let filteredQuestions = [...allQuestions];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let quizStarted = false;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const categorySelect = document.getElementById('category');
const progressBar = document.getElementById('progress-bar');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

categorySelect.addEventListener('change', () => {
  const selected = categorySelect.value;
  filteredQuestions = selected === 'all' ? [...allQuestions] : allQuestions.filter(q => q.category === selected);
  resetQuiz();
});

startBtn.addEventListener('click', () => {
  quizStarted = true;
  startBtn.disabled = true;
  nextBtn.disabled = false;
  prevBtn.disabled = false;
  showQuestion();
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < filteredQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showScore(); // ✅ Fixed: Show score if on the last question
  }
});

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

restartBtn.addEventListener('click', resetQuiz);

function selectAnswer(index, btn) {
  clearInterval(timer);
  const correctIndex = filteredQuestions[currentQuestion].answer ?? 0;
  const buttons = answersEl.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  if (index === correctIndex) {
    btn.classList.add('correct');
    feedbackEl.textContent = 'Correct!';
    score++;
  } else {
    btn.classList.add('incorrect');
    buttons[correctIndex]?.classList.add('correct');
    feedbackEl.textContent = 'Incorrect!';
  }

  feedbackEl.classList.add('show');
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer(-1, document.createElement('button'));
    }
  }, 1000);
}

function resetQuiz() {
  score = 0;
  currentQuestion = 0;
  quizStarted = false;
  clearInterval(timer);
  scoreEl.style.display = 'none';
  feedbackEl.textContent = '';
  feedbackEl.classList.remove('show');
  answersEl.innerHTML = '';
  timerEl.textContent = '';
  startBtn.disabled = false;
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  questionEl.innerHTML = "<h1>🅲🅻🅸🅲🅺 🆂🆃🅰🆁🆃 🆀🆄🅸🆉</h1>";
  progressBar.style.width = '0%';
}

function showScore() {
  quizStarted = false;
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = '';
  timerEl.textContent = '';
  feedbackEl.textContent = '';
  feedbackEl.classList.remove('show');
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  startBtn.disabled = false;
  scoreEl.style.display = 'block';
  scoreEl.textContent = `Your Score: ${score} out of ${filteredQuestions.length}`;
  progressBar.style.width = '100%';
}

function updateProgress() {
  const percent = ((currentQuestion) / filteredQuestions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function showQuestion() {
  clearInterval(timer);
  if (!quizStarted) return;
  if (currentQuestion >= filteredQuestions.length) return showScore();

  const current = filteredQuestions[currentQuestion];
  questionEl.textContent = current.question;
  answersEl.innerHTML = '';
  feedbackEl.classList.remove('show');
  feedbackEl.textContent = '';

  current.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index, btn);
    answersEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}
