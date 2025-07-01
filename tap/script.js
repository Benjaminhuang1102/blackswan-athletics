const quotes = {
  "0001": "“You miss 100% of the shots you don’t take.” – Wayne Gretzky",
  "0002": "“Champions keep playing until they get it right.” – Billie Jean King",
  "0003": "“Hard work beats talent when talent doesn’t work hard.” – Tim Notke",
};

const parts = window.location.pathname.split("/");
const id = parts[parts.length - 1];

const quote = quotes[id] || "Stay strong. Stay focused. You’ve got this 💪";
document.getElementById("quote").innerText = quote;

// -- Goal Tracking Logic --

// Helper to get today's date string like '2025-07-01'
function getTodayKey() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const goalInput = document.getElementById('goal-input');
const saveBtn = document.getElementById('save-goal');
const statusDiv = document.getElementById('status');

const storageKey = `tagup-goal-${getTodayKey()}`;

// Load saved goal if any
function loadGoal() {
  const savedGoal = localStorage.getItem(storageKey);
  if (savedGoal) {
    goalInput.value = savedGoal;
    statusDiv.textContent = "You’ve already set a goal for today.";
    saveBtn.disabled = true;
  }
}

loadGoal();

saveBtn.addEventListener('click', () => {
  const goal = goalInput.value.trim();
  if (!goal) {
    statusDiv.textContent = "Please enter a goal before saving.";
    statusDiv.style.color = "red";
    return;
  }
  localStorage.setItem(storageKey, goal);
  statusDiv.textContent = "Goal saved! Crush it today! 💪";
  statusDiv.style.color = "green";
  saveBtn.disabled = true;
});
