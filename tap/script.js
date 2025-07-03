// Quote loading logic (uses quotes.js arrays)
function getQuoteOfTheDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % quotes.length;
  return { text: quotes[index], author: authors[index] };
}

// DOM elements
const goalInput = document.getElementById('goalInput');
const goalDisplay = document.getElementById('goalDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const today = new Date().toISOString().slice(0, 10);

// Save goal
function saveGoal() {
  const goal = goalInput.value.trim();
  if (goal) {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDate', today);
    localStorage.setItem('goalDone', 'false');
    displayGoal();
  }
}

// Confetti function
function launchConfetti() {
  const confettiScript = document.createElement('script');
  confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
  confettiScript.onload = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 1.0 }
    });
  };
  document.body.appendChild(confettiScript);
}

// Mark goal as done
function markDone() {
  if (localStorage.getItem('goalDate') === today && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    let streak = parseInt(localStorage.getItem('streak') || '0') + 1;
    localStorage.setItem('streak', streak);
    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
    launchConfetti();
  }
}

// Display goal
function displayGoal() {
  const savedGoal = localStorage.getItem('dailyGoal');
  const savedDate = localStorage.getItem('goalDate');
  const isDone = localStorage.getItem('goalDone') === 'true';
  const streak = localStorage.getItem('streak') || 0;

  if (savedDate === today && savedGoal) {
    goalDisplay.textContent = `"${savedGoal}"`;
  } else {
    goalDisplay.textContent = "No goal set for today.";
  }

  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

// On load: set quote and goal
document.addEventListener("DOMContentLoaded", () => {
  const quote = getQuoteOfTheDay();
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `– ${quote.author}`;

  // Font size adjustment
  const len = quote.text.length;
  if (len > 120) {
    quoteText.style.fontSize = "1rem";
  } else if (len > 80) {
    quoteText.style.fontSize = "1.3rem";
  } else {
    quoteText.style.fontSize = "1.6rem";
  }

  displayGoal();
});
