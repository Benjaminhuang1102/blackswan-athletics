function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const today = new Date().toISOString().slice(0, 10);

function saveGoal() {
  const input = document.getElementById("goalInput").value.trim();
  if (input) {
    localStorage.setItem("dailyGoal", input);
    localStorage.setItem("goalDate", today);
    localStorage.setItem("goalDone", "false");
    displayGoal();
  }
}

function markDone() {
  if (localStorage.getItem("goalDate") === today && localStorage.getItem("goalDone") !== "true") {
    localStorage.setItem("goalDone", "true");
    let streak = parseInt(localStorage.getItem("streak") || "0") + 1;
    localStorage.setItem("streak", streak);
    document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak} days`;
    document.getElementById("goalDisplay").textContent = "✅ Completed";
  }
}

function displayGoal() {
  const savedGoal = localStorage.getItem("dailyGoal");
  const savedDate = localStorage.getItem("goalDate");
  const streak = localStorage.getItem("streak") || 0;
  const done = localStorage.getItem("goalDone") === "true";

  document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak} days`;

  if (savedDate === today && savedGoal) {
    document.getElementById("goalDisplay").textContent = done ? "✅ Completed" : `"${savedGoal}"`;
  } else {
    document.getElementById("goalDisplay").textContent = "Not completed";
  }
}

function displayQuote() {
  const day = getDayOfYear(new Date());
  const index = day % quotes.length;
  document.getElementById("quoteText").textContent = quotes[index];
  document.getElementById("quoteAuthor").textContent = authors[index];
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
  displayGoal();
});
