const result = document.querySelector("#result");
const msg = document.querySelector('#msg');


window.addEventListener("load", () => {
  render();
})

async function render () {
  const { deck_id } = await shuffleCards();
  const promise1 = await drawCard(deck_id);
  const promise2 = await drawCard(deck_id);
  const promise3 = await drawCard(deck_id);
  const promise4 = await drawCard(deck_id);
  const promise5 = await drawCard(deck_id);

  Promise.all([promise1, promise2, promise3, promise4, promise5]).then((res) => {
    msg.innerHTML = '';
    for (let el of res)  result.innerHTML += `<img src='${el.cards[0].image}' alt='card ${el.cards[0].value} of ${el.cards[0].suit}'}>`;
  });
}

async function shuffleCards () {
  try {
    return await (await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")).json();
  } catch (err) {
    msg.innerHTML = err.message;
  }
}

async function drawCard (deckID) {
  try {
    return await (await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)).json();
  } catch (err) {
    msg.innerHTML = err.message;
  }
}