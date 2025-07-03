function getQuoteOfTheDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % quotes.length;

  return {
    text: quotes[index],
    author: authors[index]
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const goalInput = document.getElementById("goalInput");
  const goalDisplay = document.getElementById("goalDisplay");
  const streakDisplay = document.getElementById("streakDisplay");
  const quoteDiv = document.getElementById("quote");
  const authorDiv = document.getElementById("author");
  const today = new Date().toISOString().slice(0, 10);

  function displayQuote() {
    const dailyQuote = getQuoteOfTheDay();
    quoteDiv.textContent = `"${dailyQuote.text}"`;
    authorDiv.textContent = `– ${dailyQuote.author}`;

    const length = dailyQuote.text.length;
    if (length > 140) {
      quoteDiv.style.fontSize = "1.2rem";
    } else if (length > 100) {
      quoteDiv.style.fontSize = "1.6rem";
    } else {
      quoteDiv.style.fontSize = "2rem";
    }
  }

  function saveGoal() {
    const goal = goalInput.value.trim();
    if (goal) {
      localStorage.setItem("dailyGoal", goal);
      localStorage.setItem("goalDate", today);
      localStorage.setItem("goalDone", "false");
      displayGoal();
    }
  }

  function markDone() {
    if (localStorage.getItem("goalDate") === today && localStorage.getItem("goalDone") !== "true") {
      localStorage.setItem("goalDone", "true");
      let streak = parseInt(localStorage.getItem("streak") || "0") + 1;
      localStorage.setItem("streak", streak);
      streakDisplay.textContent = `🔥 Streak: ${streak} days`;
      showConfetti();
    }
  }

  function displayGoal() {
    const savedGoal = localStorage.getItem("dailyGoal");
    const savedDate = localStorage.getItem("goalDate");
    const goalDone = localStorage.getItem("goalDone");
    const streak = localStorage.getItem("streak") || 0;

    if (savedDate === today && savedGoal) {
      goalDisplay.textContent = `"${savedGoal}" – ${goalDone === "true" ? "✅ Completed" : "❌ Not completed"}`;
    } else {
      goalDisplay.textContent = "No goal set for today.";
    }

    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
  }

  function showConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.bottom = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100vh";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "9999";

    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.bottom = "0";
      confetti.style.opacity = "0.9";
      confetti.style.borderRadius = "50%";
      confetti.style.animation = `confettiFall ${1 + Math.random() * 2}s ease-out forwards`;
      confettiContainer.appendChild(confetti);
    }

    const style = document.createElement("style");
    style.textContent = `
      @keyframes confettiFall {
        0% { transform: translateY(0); }
        100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      confettiContainer.remove();
      style.remove();
    }, 3000);
  }

  // Attach functions to global scope
  window.saveGoal = saveGoal;
  window.markDone = markDone;

  displayQuote();
  displayGoal();
});
