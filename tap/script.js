function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
  return Math.floor(diff / 86400000);
}

document.addEventListener("DOMContentLoaded", () => {
  const quoteDiv = document.getElementById("quote");
  const goalInput = document.getElementById("goalInput");
  const goalDisplay = document.getElementById("goalDisplay");
  const streakDisplay = document.getElementById("streakDisplay");
  const today = new Date().toISOString().slice(0, 10);

  function getQuoteOfTheDay() {
    const index = getDayOfYear(new Date()) % quotes.length;
    return quotes[index];
  }

  function saveGoal() {
    const goal = goalInput.value.trim();
    if (goal) {
      localStorage.setItem('dailyGoal', goal);
      localStorage.setItem('goalDate', today);
      localStorage.setItem('goalDone', 'false');
      displayGoal();
    }
  }

  function markDone() {
    if (localStorage.getItem('goalDate') === today && localStorage.getItem('goalDone') !== 'true') {
      localStorage.setItem('goalDone', 'true');
      let streak = parseInt(localStorage.getItem('streak') || '0') + 1;
      localStorage.setItem('streak', streak);
      streakDisplay.textContent = `🔥 Streak: ${streak} days`;
      alert('Goal marked as done! Great work.');
    }
  }

  function displayGoal() {
    const savedGoal = localStorage.getItem('dailyGoal');
    const savedDate = localStorage.getItem('goalDate');
    const streak = localStorage.getItem('streak') || 0;
    if (savedDate === today && savedGoal) {
      goalDisplay.textContent = `\"${savedGoal}\"`;
    } else {
      goalDisplay.textContent = "No goal set for today.";
    }
    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
  }

  quoteDiv.textContent = getQuoteOfTheDay();
  displayGoal();
});
