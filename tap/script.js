// File: tap/script.js
document.addEventListener("DOMContentLoaded", function () {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");
  const { text, author } = getQuoteOfTheDay();
  quoteEl.textContent = `"${text}"`;
  authorEl.textContent = `— ${author}`;

  // Set background
  const dayIndex = new Date().getDate() % backgroundImages.length;
  document.querySelector(".hero").style.backgroundImage = `url('${backgroundImages[dayIndex]}')`;

  // Goal logic
  const today = new Date().toISOString().split("T")[0];
  const saved = JSON.parse(localStorage.getItem("goalData")) || {};
  if (saved[today]) {
    document.getElementById("goalDisplay").textContent = `Today: ${saved[today].goal}`;
    document.getElementById("goalStatus").textContent = saved[today].done ? "✅ Goal completed!" : "❌ Goal not completed.";
  }
  updateStreak(saved);
});

function saveGoal() {
  const input = document.getElementById("goalInput").value;
  if (!input) return;
  const today = new Date().toISOString().split("T")[0];
  const saved = JSON.parse(localStorage.getItem("goalData")) || {};
  saved[today] = { goal: input, done: false };
  localStorage.setItem("goalData", JSON.stringify(saved));
  document.getElementById("goalDisplay").textContent = `Today: ${input}`;
  document.getElementById("goalStatus").textContent = "❌ Goal not completed.";
}

function markDone() {
  const today = new Date().toISOString().split("T")[0];
  const saved = JSON.parse(localStorage.getItem("goalData")) || {};
  if (saved[today]) {
    saved[today].done = true;
    localStorage.setItem("goalData", JSON.stringify(saved));
    document.getElementById("goalStatus").textContent = "✅ Goal completed!";
    updateStreak(saved);
  }
}

function updateStreak(data) {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (data[key]?.done) streak++;
    else break;
  }
  document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak} day${streak !== 1 ? "s" : ""}`;
}
