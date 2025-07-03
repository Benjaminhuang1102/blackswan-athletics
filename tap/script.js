// Globals
const goalInput = document.getElementById('goalInput');
const goalDisplay = document.getElementById('goalDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteContainer = document.getElementById('quote-container');
const todayStr = new Date().toISOString().slice(0, 10);

// Background images (vertical, dark grind style)
const bgImages = [
  '../assets/grind1.jpg',
  '../assets/grind2.jpg',
  '../assets/grind3.jpg',
  '../assets/grind4.jpg',
];

// Load background image by day with fade
function setBackgroundByDay() {
  const dayIndex = new Date().getDate() % bgImages.length;
  quoteContainer.style.backgroundImage = `url(${bgImages[dayIndex]})`;
}

// Save goal
function saveGoal() {
  const goal = goalInput.value.trim();
  if (goal) {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDate', todayStr);
    localStorage.setItem('goalDone', 'false');
    displayGoal();
  }
}

// Mark goal done with confetti
function markDone() {
  if (localStorage.getItem('goalDate') === todayStr && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    incrementStreak();
    launchConfetti();
    alert('Goal marked as done! Great work.');
  }
}

// Increment streak count
function incrementStreak() {
  let streak = parseInt(localStorage.getItem('streak') || '0');
  streak++;
  localStorage.setItem('streak', streak);
  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

// Display goal and streak
function displayGoal() {
  const savedGoal = localStorage.getItem('dailyGoal');
  const savedDate = localStorage.getItem('goalDate');
  const savedDone = localStorage.getItem('goalDone');
  const streak = localStorage.getItem('streak') || 0;

  if (savedDate === todayStr && savedGoal) {
    goalDisplay.textContent = `"${savedGoal}"` + (savedDone === 'true' ? ' ✅ Completed' : ' ❌ Not completed');
  } else {
    goalDisplay.textContent = "No goal set for today.";
  }

  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

// Confetti animation on completion
function launchConfetti() {
  // Using canvas-confetti library (add in html if needed)
  if (!window.confetti) return;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.7 }
  });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setBackgroundByDay();

  const quote = getQuoteOfTheDay();
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `– ${quote.author}`;

  displayGoal();
});
