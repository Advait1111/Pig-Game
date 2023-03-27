'use strict';

let dice = document.querySelector('.dice');
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let resetGame = document.querySelector('.btn--new');
let currentScore = document.querySelector('.current-score');
let playerOne = document.querySelector('.player--0');
let playerOneName = document.querySelector('#name--0');
let playerOneTotal = document.querySelector('#score--0');
let playerOneScore = document.querySelector('#current--0');
let playerTwo = document.querySelector('.player--1');
let playerTwoName = document.querySelector('#name--1');
let playerTwoTotal = document.querySelector('#score--1');
let playerTwoScore = document.querySelector('#current--1');
// dice.src = 'dice-3.png';

// console.log(dice);

let randNumber;
let currentDiceScore = [];

let randNo = function () {
  randNumber = Math.floor(Math.random() * 6 + 1);
};

let playerOneActive = function () {
  if (playerOne.classList.contains('player--active')) {
    console.log('Player one is active');
    return true;
  } else {
    console.log('Player two is active');
    return false;
  }
};

let addActive = function (player) {
  player.classList.add('player--active');
};

let removeActive = function (player) {
  player.classList.remove('player--active');
};

let showTotal = function () {
  playerOneTotal.textContent = totalOne;
  playerTwoTotal.textContent = totalTwo;
};

let playSound = function (name) {
  let mySound = new Audio(`${name}.mp3`);
  mySound.play();
};

let checkWinner = function () {
  if (totalOne >= 100) {
    console.log('Player One Wins!');
    playerOneName.textContent = 'Player 1 Wins! 🥳';
    playerTwoName.textContent = 'Player 2 is Pig! 🐷'
    playerOne.classList.add('player--winner');
    gameOn = false;
    return true;
  } else if (totalTwo >= 100) {
    console.log('Player One Wins!');
    playerTwoName.textContent = 'Player 2 Wins! 🥳';
    playerOneName.textContent = 'Player 1 is Pig! 🐷'
    playerTwo.classList.add('player--winner');
    gameOn = false;
    return true;
  } else {
    return false;
  }
};

let sum = 0;
let totalOne = 0;
let totalTwo = 0;
let gameOn = true;
showTotal();

rollDice.addEventListener('click', function () {
    console.log(!checkWinner());
    if (!checkWinner() && gameOn) {
        console.log("Inside !checkWinner() false && gameOn");
        playSound('dice');
        randNo();
        let diceName = `dice-${randNumber}.png`;
        dice.src = diceName;
        showTotal();
        if (randNumber === 1) {
          console.log("Dice is one!");
          if (playerOneActive()) {
            console.log("Player one was active. Switching to player two...");
            playerOneTotal.textContent = totalOne;
            removeActive(playerOne);
            addActive(playerTwo);
            playerOneScore.textContent = 0;
          } else {
            console.log("Player two was active, switching to player one...");
            playerTwoTotal.textContent = totalTwo;
            removeActive(playerTwo);
            addActive(playerOne);
            playerTwoScore.textContent = 0;
          }
          sum = 0;
        } else {
          console.log("Dice is not one!");
          sum += randNumber;
          if (playerOneActive()){
            playerOneScore.textContent = sum;
          } else{
            playerTwoScore.textContent = sum;
          }
      }
    }
  });

hold.addEventListener('click', function () {
  if (!checkWinner() && gameOn) {
    playSound('hold');
    if (playerOneActive()) {
      removeActive(playerOne);
      addActive(playerTwo);
      totalOne += sum;
      playerOneScore.textContent = 0;
      showTotal();
    } else {
      removeActive(playerTwo);
      addActive(playerOne);
      totalTwo += sum;
      playerTwoScore.textContent = 0;
      showTotal();
    }
    sum = 0;
    console.log(`totalOne is ${totalOne}`);
    console.log(`totalTwo is ${totalTwo}`);
    if (checkWinner()) playSound('win');
  }
});

resetGame.addEventListener('click', function () {
  playSound('restart');
  playerOneName.textContent = 'Player 1';
  playerTwoName.textContent = 'Player 2';
  playerOneScore.textContent = 0;
  playerOneTotal.textContent = 0;
  playerTwoScore.textContent = 0;
  playerTwoTotal.textContent = 0;
  removeActive(playerTwo);
  addActive(playerOne);
  totalOne = 0;
  totalTwo = 0;
  gameOn = true;
});
