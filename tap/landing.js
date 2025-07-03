window.addEventListener("DOMContentLoaded", () => {
  const { text, author } = getQuoteOfTheDay();
  document.getElementById("quote").textContent = `"${text}"`;
  document.getElementById("author").textContent = `– ${author}`;

  const bgList = backgroundImages;
  const today = new Date();
  const index = today.getDate() % bgList.length;
  document.getElementById("hero").style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('${bgList[index]}')`;
});
