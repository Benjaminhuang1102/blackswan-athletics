function getDayIndex() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function displayQuote() {
  const index = getDayIndex() % quotes.length;
  document.getElementById('quote').textContent = quotes[index];
  document.getElementById('author').textContent = `– ${authors[index]}`;
}

function cycleImage() {
  const index = getDayIndex() % images.length;
  document.querySelector('.hero').style.backgroundImage = `url('${images[index]}')`;
}

function saveGoal() {
  const goal = document.getElementById('goalInput').value.trim();
  const today = new Date().toISOString().split('T')[0];
  if (goal) {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDate', today);
    localStorage.setItem('goalDone', 'false');
    updateGoalDisplay();
  }
}

function markDone() {
  const today = new Date().toISOString().split('T')[0];
  if (localStorage.getItem('goalDate') === today && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    let streak = parseInt(localStorage.getItem('streak') || '0') + 1;
    localStorage.setItem('streak', streak);
    updateGoalDisplay();
    alert("🎉 Goal completed! Great work!");
  }
}

function updateGoalDisplay() {
  const savedGoal = localStorage.getItem('dailyGoal');
  const goalDone = localStorage.getItem('goalDone');
  const streak = localStorage.getItem('streak') || 0;
  const today = new Date().toISOString().split('T')[0];

  if (localStorage.getItem('goalDate') === today && savedGoal) {
    document.getElementById('goalDisplay').textContent = goalDone === 'true' ? `"${savedGoal}" ✅` : `"${savedGoal}" – Not completed`;
  } else {
    document.getElementById('goalDisplay').textContent = "No goal set for today.";
  }

  document.getElementById('streakDisplay').textContent = `🔥 Streak: ${streak} days`;
}

document.addEventListener('DOMContentLoaded', () => {
  displayQuote();
  cycleImage();
  updateGoalDisplay();
});
