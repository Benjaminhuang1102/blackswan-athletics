const quotes = {
  "0001": "“You miss 100% of the shots you don’t take.” – Wayne Gretzky",
  "0002": "“Champions keep playing until they get it right.” – Billie Jean King",
  "0003": "“Hard work beats talent when talent doesn’t work hard.” – Tim Notke",
};

const parts = window.location.pathname.split("/");
const id = parts[parts.length - 1];

const quote = quotes[id] || "Stay strong. Stay focused. You’ve got this 💪";
document.getElementById("quote").innerText = quote;
