// tap/script.js

// Load and display the daily quote
window.addEventListener('DOMContentLoaded', () => {
  const { text, author } = getQuoteOfTheDay();
  const quoteElem = document.getElementById('quote');
  quoteElem.innerHTML = `<p class="quote-text">“${text}”</p><p class="quote-author">– ${author}</p>`;

  // Set daily image based on day of year
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % backgroundImages.length;

  document.body.style.backgroundImage = `url(${backgroundImages[index]})`;

  updateGoalDisplay();
  updateStreakDisplay();
});

// Goal handling
function saveGoal() {
  const goal = document.getElementById('goalInput').value;
  if (goal.trim() !== "") {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalSetDate', new Date().toDateString());
    updateGoalDisplay();
  }
}

function updateGoalDisplay() {
  const goal = localStorage.getItem('dailyGoal');
  const goalDate = localStorage.getItem('goalSetDate');
  const today = new Date().toDateString();

  const goalDisplay = document.getElementById('goalDisplay');
  if (goal && goalDate === today) {
    goalDisplay.innerHTML = `<p class="goal-text">Goal: ${goal}</p><p class="goal-status">Status: <span class="not-completed">Not Completed</span></p>`;
  } else {
    goalDisplay.innerHTML = `<p class="goal-text">No goal set for today yet.</p>`;
  }
}

// Mark as done + confetti + streak logic
function markDone() {
  const today = new Date().toDateString();
  const lastDoneDate = localStorage.getItem('lastDoneDate');
  const goal = localStorage.getItem('dailyGoal');
  const goalDate = localStorage.getItem('goalSetDate');

  if (goal && goalDate === today && lastDoneDate !== today) {
    localStorage.setItem('lastDoneDate', today);

    // Update streak
    const prevDate = new Date(localStorage.getItem('lastDoneDate') || "");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    let streak = parseInt(localStorage.getItem('streak') || "0");

    if (localStorage.getItem('lastDoneDate') === yesterdayStr) {
      streak += 1;
    } else {
      streak = 1;
    }

    localStorage.setItem('streak', streak);
    updateStreakDisplay();

    // Update UI
    const goalStatus = document.querySelector('.goal-status span');
    if (goalStatus) {
      goalStatus.textContent = "Completed";
      goalStatus.classList.remove('not-completed');
      goalStatus.classList.add('completed');
    }

    launchConfetti();
  }
}

function updateStreakDisplay() {
  const streak = parseInt(localStorage.getItem('streak') || "0");
  document.getElementById('streakDisplay').textContent = `🔥 Streak: ${streak} day${streak === 1 ? '' : 's'}`;
}

// Confetti animation
function launchConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2000);
}
