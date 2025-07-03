function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function setQuote() {
  const today = new Date();
  const index = getDayOfYear(today) % quotes.length;
  const quoteText = quotes[index];
  const authorText = authors[index];

  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');

  // Dynamic font sizing for quote length
  if (quoteText.length < 70) {
    quoteEl.style.fontSize = '1.6rem';
  } else if (quoteText.length < 110) {
    quoteEl.style.fontSize = '1.3rem';
  } else {
    quoteEl.style.fontSize = '1.1rem';
  }

  quoteEl.textContent = `"${quoteText}"`;
  authorEl.textContent = `– ${authorText}`;
}

const goalInput = document.getElementById('goalInput');
const goalDisplay = document.getElementById('goalDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const todayStr = new Date().toISOString().slice(0, 10);

function saveGoal() {
  const goal = goalInput.value.trim();
  if (goal) {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDate', todayStr);
    localStorage.setItem('goalDone', 'false');
    displayGoal();
  }
}

function markDone() {
  if (localStorage.getItem('goalDate') === todayStr && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    incrementStreak();
    alert('Goal marked as done! Keep grinding 💪');
  }
}

function incrementStreak() {
  let streak = parseInt(localStorage.getItem('streak') || '0');
  streak++;
  localStorage.setItem('streak', streak);
  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

function displayGoal() {
  const savedGoal = localStorage.getItem('dailyGoal');
  const savedDate = localStorage.getItem('goalDate');
  const savedDone = localStorage.getItem('goalDone');
  const streak = localStorage.getItem('streak') || 0;

  if (savedDate === todayStr && savedGoal) {
    goalDisplay.textContent = `"${savedGoal}"`;
    goalDisplay.style.color = savedDone === 'true' ? '#4CAF50' : '#ccc';
  } else {
    goalDisplay.textContent = "Not completed";
    goalDisplay.style.color = '#ccc';
  }

  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

document.addEventListener('DOMContentLoaded', () => {
  setQuote();
  displayGoal();
});
