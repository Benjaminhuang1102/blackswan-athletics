// Get day of year (correct for timezone)
function getDayOfYear() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// QUOTE FUNCTIONS
function getQuoteOfTheDay() {
  const index = getDayOfYear() % quotes.length;
  return { text: quotes[index], author: authors[index] };
}

// IMAGE FUNCTIONS
function getImageOfTheDay() {
  const index = getDayOfYear() % backgroundImages.length;
  return backgroundImages[index];
}

// DOM elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const backgroundDiv = document.getElementById('background');
const goalInput = document.getElementById('goalInput');
const goalDisplay = document.getElementById('goalDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const saveGoalBtn = document.getElementById('saveGoalBtn');
const markDoneBtn = document.getElementById('markDoneBtn');
const todayISO = new Date().toISOString().slice(0, 10);

// Display quote & adjust font size by length
function displayQuote() {
  const { text, author } = getQuoteOfTheDay();
  quoteText.textContent = `"${text}"`;
  quoteAuthor.textContent = `– ${author}`;
  
  const len = text.length;
  if (len > 120) {
    quoteText.style.fontSize = "1rem";
  } else if (len > 80) {
    quoteText.style.fontSize = "1.3rem";
  } else {
    quoteText.style.fontSize = "1.6rem";
  }
}

// Display background image
function displayBackground() {
  const imageUrl = getImageOfTheDay();
  backgroundDiv.style.backgroundImage = `url('${imageUrl}')`;
}

// GOAL FUNCTIONS
function saveGoal() {
  const goal = goalInput.value.trim();
  if (goal) {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDate', todayISO);
    localStorage.setItem('goalDone', 'false');
    displayGoal();
  }
}

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

function markDone() {
  if (localStorage.getItem('goalDate') === todayISO && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    let streak = parseInt(localStorage.getItem('streak') || '0') + 1;
    localStorage.setItem('streak', streak);
    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
    launchConfetti();
  }
}

function displayGoal() {
  const savedGoal = localStorage.getItem('dailyGoal');
  const savedDate = localStorage.getItem('goalDate');
  const isDone = localStorage.getItem('goalDone') === 'true';
  const streak = localStorage.getItem('streak') || 0;

  if (savedDate === todayISO && savedGoal) {
    goalDisplay.textContent = `"${savedGoal}"`;
  } else {
    goalDisplay.textContent = "No goal set for today.";
  }

  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

// EVENT LISTENERS
saveGoalBtn.addEventListener('click', saveGoal);
markDoneBtn.addEventListener('click', markDone);

// INITIAL LOAD
document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
  displayBackground();
  displayGoal();
});
