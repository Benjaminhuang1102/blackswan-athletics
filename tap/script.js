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

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const goalInput = document.getElementById('goal-input');
const saveBtn = document.getElementById('save-goal');
const statusDiv = document.getElementById('status');
const timeLeftDiv = document.getElementById('time-left');
const doneBtn = document.getElementById('mark-done');
const notDoneBtn = document.getElementById('mark-notdone');

const todayKey = getTodayKey();
const goalStorageKey = `tagup-goal-${todayKey}`;
const statusStorageKey = `tagup-goal-status-${todayKey}`;

// Load saved goal and status
function loadGoalAndStatus() {
  const savedGoal = localStorage.getItem(goalStorageKey);
  const savedStatus = localStorage.getItem(statusStorageKey);

  if (savedGoal) {
    goalInput.value = savedGoal;
    saveBtn.disabled = true;
    doneBtn.disabled = false;
    notDoneBtn.disabled = false;
  }

  if (savedStatus) {
    statusDiv.textContent = `Goal status: ${savedStatus === 'done' ? '✅ Done' : '❌ Not Done'}`;
  }
}

loadGoalAndStatus();

saveBtn.addEventListener('click', () => {
  const goal = goalInput.value.trim();
  if (!goal) {
    statusDiv.style.color = "red";
    statusDiv.textContent = "Please enter a goal before saving.";
    return;
  }
  localStorage.setItem(goalStorageKey, goal);
  statusDiv.style.color = "green";
  statusDiv.textContent = "Goal saved! Crush it today! 💪";
  saveBtn.disabled = true;
  doneBtn.disabled = false;
  notDoneBtn.disabled = false;
});

doneBtn.addEventListener('click', () => {
  localStorage.setItem(statusStorageKey, 'done');
  statusDiv.style.color = "green";
  statusDiv.textContent = "Goal status: ✅ Done. Great job!";
  doneBtn.disabled = true;
  notDoneBtn.disabled = false;
});

notDoneBtn.addEventListener('click', () => {
  localStorage.setItem(statusStorageKey, 'notdone');
  statusDiv.style.color = "red";
  statusDiv.textContent = "Goal status: ❌ Not Done. Keep pushing!";
  notDoneBtn.disabled = true;
  doneBtn.disabled = false;
});

// Disable buttons properly based on status
function updateButtons() {
  const status = localStorage.getItem(statusStorageKey);
  if (!localStorage.getItem(goalStorageKey)) {
    doneBtn.disabled = true;
    notDoneBtn.disabled = true;
    saveBtn.disabled = false;
  } else if (status === 'done') {
    doneBtn.disabled = true;
    notDoneBtn.disabled = false;
    saveBtn.disabled = true;
  } else if (status === 'notdone') {
    notDoneBtn.disabled = true;
    doneBtn.disabled = false;
    saveBtn.disabled = true;
  } else {
    doneBtn.disabled = false;
    notDoneBtn.disabled = false;
    saveBtn.disabled = true;
  }
}

updateButtons();

// -- Time Left in Day --

function updateTimeLeft() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23,59,59,999);

  let diffMs = endOfDay - now;
  if (diffMs < 0) diffMs = 0;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  timeLeftDiv.textContent = `Time left today: ${hours}h ${minutes}m ${seconds}s`;

  // Update every second
  setTimeout(updateTimeLeft, 1000);
}

updateTimeLeft();

