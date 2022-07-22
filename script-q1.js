const result = document.querySelector('#result');
const msg = document.querySelector('#msg');

window.addEventListener("load", () => {
  shuffleCards();
});

async function shuffleCards() {
  try {
    const { deck_id } = await (await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", { method: "GET" })).json();
    msg.innerHTML = ''
    for (i = 0; i < 5; i++) drawCard(deck_id);
  } catch (err) {
    msg.innerHTML = err.message;
  }
}

async function drawCard(deckID) {
  try {
    const { cards } = await (await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`, { method: "GET" })).json();
    msg.innerHTML = ''
    result.innerHTML += `<img src='${cards[0].image}' alt='card ${cards[0].value} of ${cards[0].suit}'}>`;
  } catch (err) {
    msg.innerHTML = err.message;
  }
}
