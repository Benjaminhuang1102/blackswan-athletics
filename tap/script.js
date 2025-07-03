// Utility: Get day of year
function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Display Quote of the Day
function displayQuote() {
  const quoteDiv = document.getElementById('quote');
  const authorDiv = document.getElementById('author');
  const dayIndex = getDayOfYear() % quotes.length;

  const [quoteText, authorText] = quotes[dayIndex].split(' – ');
  quoteDiv.textContent = `“${quoteText.trim()}”`;
  authorDiv.textContent = `– ${authorText?.trim() || 'Unknown'}`;

  // Auto resize quote font based on length
  const length = quoteText.length;
  if (length > 160) {
    quoteDiv.style.fontSize = "1.4rem";
  } else if (length > 100) {
    quoteDiv.style.fontSize = "1.6rem";
  } else {
    quoteDiv.style.fontSize = "1.9rem";
  }
}

// Goal + Streak Logic
function setupGoalSystem() {
  const goalInput = document.getElementById('goalInput');
  const goalDisplay = document.getElementById('goalDisplay');
  const streakDisplay = document.getElementById('streakDisplay');
  const setBtn = document.getElementById('setGoalBtn');
  const doneBtn = document.getElementById('doneBtn');
  const today = new Date().toISOString().slice(0, 10);

  function updateUI() {
    const savedGoal = localStorage.getItem('dailyGoal');
    const savedDate = localStorage.getItem('goalDate');
    const savedDone = localStorage.getItem('goalDone');
    const streak = localStorage.getItem('streak') || 0;

    if (savedDate === today && savedGoal) {
      goalDisplay.textContent = `"${savedGoal}"`;
    } else {
      goalDisplay.textContent = "No goal set for today.";
    }

    if (savedDate === today && savedDone === "true") {
      doneBtn.textContent = "✅ Completed";
      doneBtn.disabled = true;
    } else {
      doneBtn.textContent = "Mark as Done ✅";
      doneBtn.disabled = false;
    }

    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
  }

  function saveGoal() {
    const goal = goalInput.value.trim();
    if (goal) {
      localStorage.setItem('dailyGoal', goal);
      localStorage.setItem('goalDate', today);
      localStorage.setItem('goalDone', 'false');
      updateUI();
    }
  }

  function markDone() {
    const savedDate = localStorage.getItem('goalDate');
    const savedDone = localStorage.getItem('goalDone');
    if (savedDate === today && savedDone !== "true") {
      localStorage.setItem('goalDone', 'true');

      let streak = parseInt(localStorage.getItem('streak') || '0');
      streak++;
      localStorage.setItem('streak', streak);

      launchConfetti();
      updateUI();
    }
  }

  setBtn.addEventListener('click', saveGoal);
  doneBtn.addEventListener('click', markDone);
  updateUI();
}

// Confetti Celebration (simple emoji burst)
function launchConfetti() {
  const burst = document.createElement('div');
  burst.style.position = 'fixed';
  burst.style.bottom = '20px';
  burst.style.left = '50%';
  burst.style.transform = 'translateX(-50%)';
  burst.style.fontSize = '2rem';
  burst.style.zIndex = '1000';
  burst.innerHTML = '🎉 🎊 💪 🎯 🎉';

  document.body.appendChild(burst);

  setTimeout(() => {
    burst.remove();
  }, 3000);
}

// Init all on page load
document.addEventListener('DOMContentLoaded', () => {
  displayQuote();
  setupGoalSystem();
});
