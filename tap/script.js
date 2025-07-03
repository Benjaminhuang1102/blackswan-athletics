document.addEventListener("DOMContentLoaded", () => {
  const goalInput = document.getElementById("goalInput");
  const goalDisplay = document.getElementById("goalDisplay");
  const streakDisplay = document.getElementById("streakDisplay");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  // Quote
  const quote = getQuoteOfTheDay();
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `– ${quote.author}`;

  // Load saved goal
  const savedGoal = localStorage.getItem("dailyGoal");
  const isDone = localStorage.getItem("goalDone") === "true";
  if (savedGoal) {
    goalDisplay.textContent = isDone ? `✅ ${savedGoal}` : `📌 ${savedGoal}`;
  }

  // Load streak
  const streak = parseInt(localStorage.getItem("streak") || "0");
  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
});

function saveGoal() {
  const input = document.getElementById("goalInput").value;
  if (input.trim()) {
    localStorage.setItem("dailyGoal", input);
    localStorage.setItem("goalDone", "false");
    document.getElementById("goalDisplay").textContent = `📌 ${input}`;
  }
}

function markDone() {
  const savedGoal = localStorage.getItem("dailyGoal");
  if (!savedGoal) return;

  if (localStorage.getItem("goalDone") === "true") return;

  localStorage.setItem("goalDone", "true");
  document.getElementById("goalDisplay").textContent = `✅ ${savedGoal}`;

  // Update streak
  let streak = parseInt(localStorage.getItem("streak") || "0");
  streak += 1;
  localStorage.setItem("streak", streak);
  document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak} days`;
}
