// User Info
const user = localStorage.getItem("ssc_user");
const roll = localStorage.getItem("ssc_roll");
if (user && roll) {
  document.getElementById("userInfo").innerText = `Name: ${user} | Roll: ${roll}`;
} else {
  window.location.href = "index.html";
}

// Dummy Questions (replace with your own or load from file/server)
const questions = [
  {
    q: "What is the capital of India?",
    options: ["Kolkata", "Delhi", "Mumbai", "Chennai"],
    answer: 1
  },
  {
    q: "भारत के पहले प्रधानमंत्री कौन थे?",
    options: ["लाल बहादुर शास्त्री", "इंदिरा गांधी", "राजीव गांधी", "जवाहरलाल नेहरू"],
    answer: 3
  },
  {
    q: "ভারতের জাতীয় পশু কোনটি?",
    options: ["সিংহ", "বাঘ", "হাতি", "গরু"],
    answer: 1
  }
];

// Shuffle questions
const shuffled = questions.sort(() => Math.random() - 0.5);
let current = 0;
let answers = new Array(questions.length).fill(null);

// Load question
function loadQuestion() {
  const container = document.getElementById("questionContainer");
  const q = shuffled[current];
  container.innerHTML = `
    <h3>Question ${current + 1} of ${shuffled.length}</h3>
    <p>${q.q}</p>
    <ul>
      ${q.options.map((opt, i) =>
        `<li>
          <label>
            <input type="radio" name="option" value="${i}" ${answers[current] === i ? "checked" : ""}/> 
            ${opt}
          </label>
        </li>`).join("")}
    </ul>
  `;
}
loadQuestion();

// Save answer
document.getElementById("questionContainer").addEventListener("change", (e) => {
  if (e.target.name === "option") {
    answers[current] = parseInt(e.target.value);
  }
});

// Navigation
document.getElementById("prevBtn").onclick = () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
};
document.getElementById("nextBtn").onclick = () => {
  if (current < shuffled.length - 1) {
    current++;
    loadQuestion();
  }
};

// Submit
document.getElementById("submitBtn").onclick = () => {
  if (confirm("Submit test?")) {
    localStorage.setItem("ssc_answers", JSON.stringify(answers));
    localStorage.setItem("ssc_questions", JSON.stringify(shuffled));
    window.location.href = "result.html";
  }
};

// Timer
let timeLeft = 80 * 60; // 80 minutes
const timerEl = document.getElementById("timer");

const timer = setInterval(() => {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  timerEl.innerText = `Time Left: ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timer);
    alert("Time's up! Submitting test...");
    document.getElementById("submitBtn").click();
  }
}, 1000);
