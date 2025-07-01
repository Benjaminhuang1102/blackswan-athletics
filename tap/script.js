<script>
  const quotes = [
    "“You miss 100% of the shots you don’t take.” – Wayne Gretzky",
    "“Champions keep playing until they get it right.” – Billie Jean King",
    "“Hard work beats talent when talent doesn’t work hard.” – Tim Notke",
    "“It’s not whether you get knocked down; it’s whether you get up.” – Vince Lombardi",
    "“The difference between the impossible and the possible lies in a person’s determination.” – Tommy Lasorda",
    "“Success isn’t owned. It’s leased. And rent is due every day.” – J.J. Watt",
    "“Do something today that your future self will thank you for.” – Sean Patrick Flanery"
  ];

  function getQuoteOfTheDay() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % quotes.length;
    return quotes[index];
  }

  // Existing DOM elements
  const goalInput = document.getElementById('goalInput');
  const goalDisplay = document.getElementById('goalDisplay');
  const streakDisplay = document.getElementById('streakDisplay');
  const quoteDiv = document.getElementById('quote');
  const today = new Date().toISOString().slice(0, 10);

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
    if (localStorage.getItem('goalDate') === today) {
      if (localStorage.getItem('goalDone') !== 'true') {
        localStorage.setItem('goalDone', 'true');
        incrementStreak();
        alert('Goal marked as done! Great work.');
      }
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
    if (savedDate === today && savedGoal) {
      goalDisplay.textContent = `"${savedGoal}"`;
    } else {
      goalDisplay.textContent = "No goal set for today.";
    }
    streakDisplay.textContent = `🔥 Streak: ${streak} days`;
  }

  // Set the daily quote on page load
  quoteDiv.textContent = getQuoteOfTheDay();

  displayGoal();
</script>
