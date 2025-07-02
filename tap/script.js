<script>
  const quotes = [
    "You miss 100% of the shots you don’t take.",
    "Champions keep playing until they get it right.",
    "Hard work beats talent when talent doesn’t work hard.",
    "It’s not whether you get knocked down; it’s whether you get up.",
    "The difference between the impossible and the possible lies in a person’s determination.",
    "Success isn’t owned. It’s leased. And rent is due every day.",
    "Do something today that your future self will thank you for."
  ];
  const authors = [
    "Wayne Gretzky",
    "Billie Jean King",
    "Tim Notke",
    "Vince Lombardi",
    "Tommy Lasorda",
    "J.J. Watt",
    "Sean Patrick Flanery"
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1614284477357-7b7a0e5479f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1546484959-f676d97f5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1603297621325-14c2ba2f3d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80"
  ];

  function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function displayQuoteAndBackground() {
    const dayIndex = getDayOfYear() % quotes.length;

    // Set background image
    const hero = document.getElementById("hero");
    hero.style.backgroundImage = `url('${backgroundImages[dayIndex % backgroundImages.length]}')`;

    // Set quote text and author
    document.getElementById("quoteText").textContent = `“${quotes[dayIndex]}”`;
    document.getElementById("quoteAuthor").textContent = `– ${authors[dayIndex]}`;
  }

  // Run after DOM loads
  document.addEventListener("DOMContentLoaded", () => {
    displayQuoteAndBackground();
  });
</script>
