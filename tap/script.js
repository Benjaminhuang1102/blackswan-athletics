let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate") || null;

function updateDisplay() {
  const goal = localStorage.getItem("dailyGoal") || "";
  const completed = localStorage.getItem("goalCompleted") === "true";
  const display = document.getElementById("goalDisplay");

  if (!goal) {
    display.textContent = "No goal set today.";
  } else if (completed) {
    display.textContent = `✅ Goal completed: ${goal}`;
  } else {
    display.textContent = `Goal not completed: ${goal}`;
  }

  document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak} days`;
}

function saveGoal() {
  const goal = document.getElementById("goalInput").value.trim();
  if (!goal) return;

  const today = new Date().toDateString();
  localStorage.setItem("dailyGoal", goal);
  localStorage.setItem("goalCompleted", "false");
  localStorage.setItem("goalDate", today);
  updateDisplay();
}

function markDone() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("lastCompletedDate");

  if (lastDate !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletedDate", today);
  }

  localStorage.setItem("goalCompleted", "true");
  updateDisplay();

  // Confetti 🎉
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2000);
}

window.onload = updateDisplay;
