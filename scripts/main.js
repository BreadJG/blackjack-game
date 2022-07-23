//hands
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
let dealerArr = [];
let playerArr = [];
let hiddenArr = [];
const dealerTotal = document.getElementById('dealer-points');
const playerTotal = document.getElementById('player-points');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');

//cards
let deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const cardsText = document.getElementById('cards-left');

//buttons
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const shuffleButton = document.getElementById('shuffle-button');
const threeDeck = document.getElementById('3-button');
const sixDeck = document.getElementById('6-button');

//End Game Message
const resultBox = document.getElementById('messages');

let winCount = 0;
let lossCount = 0;

wins.innerHTML = winCount;
losses.innerHTML = lossCount;

function blackJack(){
  calculateScore(dealerArr, dealerTotal);
  calculateScore(playerArr, playerTotal);
  resultBox.innerHTML = '<i class="bi bi-suit-spade-fill"></i> BLACKJACK!!! <i class="bi bi-suit-spade-fill"></i>'
  gameStarted = false;

  let winCount = wins.innerHTML;
  let newWins = parseInt(winCount) + 1;
  wins.innerHTML = newWins;
}

function winner(){
  calculateScore(dealerArr, dealerTotal);
  calculateScore(playerArr, playerTotal);
  resultBox.innerHTML = '<i class="bi bi-emoji-laughing-fill"></i> WINNER <i class="bi bi-emoji-laughing-fill"></i>';
  gameStarted = false;

  let winCount = wins.innerHTML;
  let newWins = parseInt(winCount) + 1;
  wins.innerHTML = newWins;
}

function play(){
  calculateScore(playerArr, playerTotal);
  resultBox.textContent = 'Hit or Stay?';
}

function loser(){
  calculateScore(dealerArr, dealerTotal);
  calculateScore(playerArr, playerTotal);
  resultBox.innerHTML = '<i class="bi bi-emoji-frown"></i> Dealer Wins <i class="bi bi-emoji-frown"></i>';
  resultBox.classList.add('error');
  gameStarted = false;
  
  let lossCount = losses.innerHTML;
  let newLosses = parseInt(lossCount) + 1;
  losses.innerHTML = newLosses;
}

function bust(){
  calculateScore(dealerArr, dealerTotal);
  calculateScore(playerArr, playerTotal);
  resultBox.innerHTML ='<i class="bi bi-trash"></i> Bust <i class="bi bi-trash"></i>';
  resultBox.classList.add('error');
  gameStarted = false;

  let lossCount = losses.innerHTML;
  let newLosses = parseInt(lossCount) + 1;
  losses.innerHTML = newLosses;
}

function tie(){
  calculateScore(dealerArr, dealerTotal);
  calculateScore(playerArr, playerTotal);
  resultBox.innerHTML = '<i class="bi bi-pencil"></i> Tie <i class="bi bi-pencil"></i>';
  gameStarted = false;
}

function hit(){
  if (gameStarted === true){
    dealToPlayer();
    calculateScore(playerArr, playerTotal);
  } else if (gameStarted === false) {
    alert('Click Deal!');
  } else if (deck.length === 0){
    alert('Shuffle Deck!');
  }
}

function cardsLeft(){
  let cardsLeft = deck.length;
  let cardsLeftString= cardsLeft.toString();
  cardsText.textContent = cardsLeftString;
}

//scores
function calculateScore(hand, total){
  let score = 0;
  let ace = hand.indexOf(11);
  for (let i = 0; i < hand.length; i++) {
    if (score > 10){
      hand[ace] = 1;
    } else {
      hand[ace] = 11;
    }
    score += hand[i] ;
  }
  let totalScore = score.toString();
  total.textContent = totalScore;
}

function checkScore(){
  let player = parseInt(playerTotal.innerText);
  let dealer = parseInt(dealerTotal.innerText);

  calculateScore(playerArr, playerTotal);
  calculateScore(dealerArr, dealerTotal);
  showHidden();


  if (player <= 21 && player > dealer || dealer > 21 && player <= 21){
    return winner();
  } else if (player > 21){
    return bust();
  } else if (dealer <= 21 && dealer > player){
    return loser();
  } else if (dealer = player){
    return tie();
  }
}


//Game Rules
let gameStarted = false;


const makeDeck = (rank, suit) => {
  const card = {};
  card.rank = rank;
  card.suit = suit;
  if (card.rank < 10){
    card.pointValue = rank;
  } else if (rank === "ace"){
    card.pointValue = 11;
  } else {
    card.pointValue = 10;
  }
  deck.push(card);
};



// reset game
function reset(){
  while (playerHand.firstChild){
    playerHand.removeChild(playerHand.firstChild);
  }
  while (dealerHand.firstChild){
    dealerHand.removeChild(dealerHand.firstChild);
  }
  if (resultBox.classList.contains('error')){
    resultBox.classList.remove('error');
  }
  hiddenArr = [];
  dealerArr = [];
  playerArr =[];
  gameStarted = false;
}


//functions for dealing
function shuffle(deck){
  for (let i = 0; i < deck.length; i++) {
    let rand = Math.floor(Math.random() * i);
    let newDeck = deck[i];
    deck[i] = deck[rand];
    deck[rand] = newDeck;
  }
}


function dealToDealer(){
  let draw = deck[0]
  let cardName = draw.rank + "_" + "of" + "_" + draw.suit;
  let cardImage = document.createElement('img');
  cardImage.src = "/blackjack/images/" + cardName + ".png";
  
  dealerArr.push(draw.pointValue);
  deck.shift();
  dealerHand.appendChild(cardImage);
}

function showHidden(){
  let card = hiddenArr[0] + "_" + "of" + "_" + hiddenArr[1];
  let hidden = dealerHand.firstChild;
  hidden.src = "/blackjack/images/" + card + ".png";
}

function dealHidden(){
  let draw = deck[0]
  let cardName = draw.rank + "_" + "of" + "_" + draw.suit;
  let cardImage = document.createElement('img');
  cardImage.src = "/blackjack/images/hidden_card.jpeg";
  
  dealerArr.push(draw.pointValue);
  deck.shift();
  dealerHand.appendChild(cardImage);
  hiddenArr.push(draw.rank);
  hiddenArr.push(draw.suit);
}

function dealToPlayer(){
  let draw = deck[0]
  let cardName = draw.rank + "_" + "of" + "_" + draw.suit;
  let cardImage = document.createElement('img');
  cardImage.src = "/blackjack/images/" + cardName + ".png";
  
  playerArr.push(draw.pointValue);
  deck.shift();
  playerHand.appendChild(cardImage);
}


///////
//
//BUTTONS
dealButton.addEventListener('click', function(e){
  if(deck.length > 4){
    reset();
    shuffle(deck);
    dealToPlayer();
    dealHidden();
    dealToPlayer();
    dealToDealer();
    calculateScore(playerArr, playerTotal);
    cardsLeft();
    gameStarted = true;
    if (parseInt(playerTotal.innerText) === 21){
      return blackJack ();
    } else{
      play();
    }
  } else {
    alert('Shuffle Deck!')
  }
  dealerTotal.innerText = "??";
})

hitButton.addEventListener('click', function(e){
  hit();
  cardsLeft();
  calculateScore(playerArr, playerTotal);
  if (parseInt(playerTotal.innerText) > 21){
    return bust ();
  } else if (parseInt(playerTotal.innerText) === 21){
    return blackJack();
  } else{
    play();
  }
})

standButton.addEventListener('click', function(e){
  calculateScore(dealerArr, dealerTotal);
  if (gameStarted === false){
    alert("Click Deal!")
  } else{
    while (parseInt(dealerTotal.innerText) < 17){
      dealToDealer();
      calculateScore(dealerArr, dealerTotal);
    } 
      checkScore();
  }
  cardsLeft();
})

shuffleButton.addEventListener('click',function(e){
  reset();
  deck.length = 0
  for (let suit of suits) {
    for (const rank of ranks) {
      makeDeck(rank, suit);
    }
  }
  shuffle(deck);
  cardsLeft();
  console.log(deck);
})

threeDeck.addEventListener('click',function(e){
  reset();
  deck.length = 0
  while(deck.length < 156){
    for (let suit of suits) {
      for (const rank of ranks) {
        makeDeck(rank, suit);
      }
    }
  }
  shuffle(deck);
  cardsLeft();
  console.log(deck);
})

sixDeck.addEventListener('click',function(e){
  reset();
  deck.length = 0
  while(deck.length < 312){
    for (let suit of suits) {
      for (const rank of ranks) {
        makeDeck(rank, suit);
      }
    }
  }
  shuffle(deck);
  cardsLeft();
  console.log(deck);
})


    window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
  });
