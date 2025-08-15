const quizData = [
  {
    question: "- Which of the following is not a primitive data type in Java?",
    options: ["int", "float", "boolean", "string"],
    answer: "string"
  },
  {
    question: "- What does the typeof operator return for an array in JavaScript?",
    options: [ "array","object","list","undefined"],
    answer:"object"
  },
  {
   question: "What Symbol is used to denote a pointer in C?",
    options: ["&","*","%","$"],
    answer: "*"
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "Sequential Query Logic", "System Query Language"],
    answer: "Structured Query Language"
  },
  {
    question: "Which Keyword is used to create a constant in javascript?",
    options: ["let", "var", "const", "define"],
    answer: "const"
  }
];

const form = document.getElementById("quiz-form");
const resultBox = document.getElementById("result");

// Dynamically build quiz
quizData.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  questionDiv.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  q.options.forEach((option) => {
    const id = `q${index}_${option}`;
    optionsDiv.innerHTML += `
      <label for="${id}">
        <input type="radio" name="question${index}" id="${id}" value="${option}">
        ${option}
      </label>
    `;
  });

  questionDiv.appendChild(optionsDiv);
  form.appendChild(questionDiv);
});

// Submit logic
document.getElementById("submit-btn").addEventListener("click", function () {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  resultBox.innerHTML = `You scored ${score} out of ${quizData.length} questions correctly!`;

  // Optional: Disable further selection after submit
  const allInputs = form.querySelectorAll("input");
  allInputs.forEach(input => input.disabled = true);

  this.disabled = true;
});
