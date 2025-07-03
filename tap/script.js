// script.js

const quotes = [
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky"
  },
  {
    text: "Champions keep playing until they get it right.",
    author: "Billie Jean King"
  },
  {
    text: "Hard work beats talent when talent doesn’t work hard.",
    author: "Tim Notke"
  },
  {
    text: "It’s not whether you get knocked down; it’s whether you get up.",
    author: "Vince Lombardi"
  },
  {
    text: "Success isn’t owned. It’s leased. And rent is due every day.",
    author: "J.J. Watt"
  },
  // Add more up to 100...
];

const images = [
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
  'https://images.unsplash.com/photo-1600488995262-02e5ec8b3c6b',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
  'https://images.unsplash.com/photo-1543832923-58f58b50fe3d',
  'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca'
];

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getQuoteOfTheDay() {
  const index = getDayOfYear(new Date()) % quotes.length;
  return quotes[index];
}

function getImageOfTheDay() {
  const index = getDayOfYear(new Date()) % images.length;
  return images[index];
}

function displayQuote() {
  const { text, author } = getQuoteOfTheDay();
  const quoteDiv = document.getElementById('quote');
  const authorDiv = document.getElementById('author');

  quoteDiv.textContent = `“${text}”`;
  authorDiv.textContent = `– ${author}`;

  // Font scaling
  if (text.length > 120) {
    quoteDiv.style.fontSize = '1rem';
  } else if (text.length > 80) {
    quoteDiv.style.fontSize = '1.2rem';
  } else {
    quoteDiv.style.fontSize = '1.5rem';
  }
}

function displayBackground() {
  const image = getImageOfTheDay();
  const img = new Image();
  img.src = image;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${image}')`;
  };
  img.onerror = () => {
    document.body.style.backgroundImage = `url('fallback.jpg')`;
  };
}

function saveGoal() {
  const goalInput = document.getElementById('goalInput').value.trim();
  const today = new Date().toISOString().slice(0, 10);
  if (goalInput) {
    localStorage.setItem('dailyGoal', goalInput);
    localStorage.setItem('goalDate', today);
    localStorage.setItem('goalDone', 'false');
    displayGoal();
  }
}

function markDone() {
  const today = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem('goalDate') === today && localStorage.getItem('goalDone') !== 'true') {
    localStorage.setItem('goalDone', 'true');
    incrementStreak();
    triggerConfetti();
    alert('🎉 Goal marked as done! Keep grinding.');
  }
}

function incrementStreak() {
  let streak = parseInt(localStorage.getItem('streak') || '0');
  streak++;
  localStorage.setItem('streak', streak);
  document.getElementById('streakDisplay').textContent = `🔥 Streak: ${streak} days`;
}

function displayGoal() {
  const today = new Date().toISOString().slice(0, 10);
  const goal = localStorage.getItem('dailyGoal');
  const date = localStorage.getItem('goalDate');
  const streak = localStorage.getItem('streak') || 0;

  const display = document.getElementById('goalDisplay');
  const streakDisplay = document.getElementById('streakDisplay');

  if (goal && date === today) {
    const done = localStorage.getItem('goalDone') === 'true';
    display.textContent = done ? `✅ "${goal}"` : `❌ "${goal}"`;
  } else {
    display.textContent = 'No goal set for today.';
  }
  streakDisplay.textContent = `🔥 Streak: ${streak} days`;
}

function triggerConfetti() {
  // Lightweight canvas confetti
  if (window.confetti) {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 1.0 }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayQuote();
  displayGoal();
  displayBackground();

  window.saveGoal = saveGoal;
  window.markDone = markDone;
});
