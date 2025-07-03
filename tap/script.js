document.addEventListener('DOMContentLoaded', () => {
  const { text, author } = getQuoteOfTheDay();
  document.getElementById('quote').textContent = text;
  document.getElementById('author').textContent = `– ${author}`;

  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('goals') || '{}');

  if (data[today]) {
    document.getElementById('goalDisplay').textContent = data[today].done ?
      `✅ ${data[today].goal}` : `❌ ${data[today].goal}`;
  }

  updateStreak(data);

  document.getElementById('saveBtn').addEventListener('click', () => {
    if (data[today]) return alert("Goal already set today.");
    const g = document.getElementById('goalInput').value.trim();
    if (!g) return;
    data[today] = { goal: g, done: false };
    localStorage.setItem('goals', JSON.stringify(data));
    document.getElementById('goalDisplay').textContent = `❌ ${g}`;
    updateStreak(data);
  });

  document.getElementById('doneBtn').addEventListener('click', () => {
    if (!data[today] || data[today].done) return;
    data[today].done = true;
    localStorage.setItem('goals', JSON.stringify(data));
    document.getElementById('goalDisplay').textContent = `✅ ${data[today].goal}`;
    updateStreak(data);
    confetti();
  });
});

function updateStreak(data) {
  const today = new Date();
  let count = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = d.toDateString();
    if (data[key] && data[key].done) count++;
    else break;
  }
  document.getElementById('streakDisplay').textContent = `🔥 Streak: ${count} days`;
}

function confetti() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}
