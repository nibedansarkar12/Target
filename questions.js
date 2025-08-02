// প্রশ্ন JSON ফাইল থেকে লোড করে লোকাল স্টোরেজে রাখে
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    const shuffled = shuffleArray(data);
    localStorage.setItem('questions', JSON.stringify(shuffled));
    localStorage.setItem('currentIndex', '0');
    localStorage.setItem('score', '0');
    localStorage.setItem('answers', JSON.stringify([]));
    window.location.href = "quiz.html"; // প্রশ্ন দেখানোর পেজে নিয়ে যায়
  } catch (error) {
    alert("প্রশ্ন লোড করা যাচ্ছে না!");
    console.error(error);
  }
}

// Fisher–Yates Shuffle algorithm
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}
