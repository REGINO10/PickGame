'use strict';

let secretNumber = 0;
const win0 = document.querySelector('.win--0');
win0.style.display = 'none';
const win1 = document.querySelector('.win--1');
win1.style.display = 'none';
const btn__roll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
dice.style.display = 'none';
let currentPoint1 = document.querySelector('#current--0');
let currentPoint2 = document.querySelector('#current--1');
const hold = document.querySelector('.btn--hold');
let point1 = document.querySelector('#score--0');
point1.textContent = 0;
let point2 = document.querySelector('#score--1');
point2.textContent = 0;
const newGame = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const rollDiceCalc = function (currentScore) {
  currentScore.textContent = Number(currentScore.textContent) + secretNumber;
};

const rollDiceCalcOne = function (currentPlayer, nextPlayer, currentScore) {
  currentPlayer.classList.remove('player--active');
  nextPlayer.classList.add('player--active');
  currentScore.textContent = 0;
};

const holdButtonCalc = function (
  totalPoint,
  currentPoint,
  currentPlayer,
  otherPlayer,
  win
) {
  totalPoint.textContent =
    Number(totalPoint.textContent) + Number(currentPoint.textContent);
  if (totalPoint.textContent >= 100) {
    win.style.display = 'block';
    newGameButton();
    setTimeout(function () {
      win.style.display = 'none';
    }, 5000);

    return;
  }
  currentPlayer.classList.remove('player--active');
  otherPlayer.classList.add('player--active');
  currentPoint.textContent = 0;
};

const rollDice = function () {
  secretNumber = Number(Math.floor(Math.random() * 6 + 1));
  if (secretNumber != 1) {
    if (player1.classList.contains('player--active')) {
      rollDiceCalc(currentPoint1);
    } else {
      rollDiceCalc(currentPoint2);
    }
  } else {
    if (player1.classList.contains('player--active')) {
      rollDiceCalcOne(player1, player2, currentPoint1);
    } else {
      rollDiceCalcOne(player2, player1, currentPoint2);
    }
  }

  if (secretNumber === 1) {
    dice.src = 'dice-1.png';
  } else if (secretNumber === 2) {
    dice.src = 'dice-2.png';
  } else if (secretNumber === 3) {
    dice.src = 'dice-3.png';
  } else if (secretNumber === 4) {
    dice.src = 'dice-4.png';
  } else if (secretNumber === 5) {
    dice.src = 'dice-5.png';
  } else {
    dice.src = 'dice-6.png';
  }
  dice.style.display = 'block';
};

const holdButton = function () {
  if (player1.classList.contains('player--active')) {
    holdButtonCalc(point1, currentPoint1, player1, player2, win0);
  } else {
    holdButtonCalc(point2, currentPoint2, player2, player1, win1);
  }
};

const newGameButton = function () {
  dice.style.display = 'none';
  point1.textContent = 0;
  point2.textContent = 0;
  currentPoint1.textContent = 0;
  currentPoint2.textContent = 0;

  if (player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
};

btn__roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdButton);
newGame.addEventListener('click', newGameButton);
