function getDayOfYear() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function loadQuote() {
  const index = getDayOfYear() % quotes.length;
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  quoteText.textContent = `"${quotes[index]}"`;
  quoteAuthor.textContent = `– ${authors[index]}`;
}

const goalInput = document.getElementById("goalInput");
const goalDisplay = document.getElementById("goalDisplay");
const streakDisplay = document.getElementById("streakDisplay");
const today = new Date().toISOString().slice(0, 10);

function saveGoal() {
  const goal = goalInput.value.trim();
  if (goal) {
    localStorage.setItem("dailyGoal", goal);
    localStorage.setItem("goalDate", today);
    localStorage.setItem("goalDone", "false");
    displayGoal();
  }
}

function markDone() {
  if (localStorage.getItem("goalDate") === today && localStorage.getItem("goalDone") !== "true") {
    localStorage.setItem("goalDone", "true");
    incrementStreak();
    displayGoal();
    showConfetti(); // 🎉 Optional: add confetti later
  }
}

function incrementStreak() {
  let streak = parseInt(localStorage.getItem("streak") || "0");
  streak++;
  localStorage.setItem("streak", streak);
  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

function displayGoal() {
  const savedGoal = localStorage.getItem("dailyGoal");
  const savedDate = localStorage.getItem("goalDate");
  const savedDone = localStorage.getItem("goalDone");
  const streak = localStorage.getItem("streak") || 0;

  if (savedDate === today && savedGoal) {
    goalDisplay.textContent = savedDone === "true" ? `"${savedGoal}" ✅` : `"${savedGoal}" — Not completed`;
  } else {
    goalDisplay.textContent = "Not completed";
  }

  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

function showConfetti() {
  // Optionally use a confetti library or CSS animation
  alert("🎉 Goal marked as done! Great job!");
}

loadQuote();
displayGoal();
