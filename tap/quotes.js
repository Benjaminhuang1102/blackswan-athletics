const quotes = [
  "You miss 100% of the shots you don’t take.",
  "Champions keep playing until they get it right.",
  // ... up to 100 quotes
];
const authors = [
  "Wayne Gretzky",
  "Billie Jean King",
  // ... matching 100 authors
];

function getQuoteOfTheDay() {
  const d = new Date();
  const day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  const i = day % quotes.length;
  let splitQuote = quotes[i].replace(/, /g, ",\n");
  return { text: splitQuote, author: authors[i] };
}
