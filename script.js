'use strict';
//selsecting elements..
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//strating condtions

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEl.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};
init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player0EL.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {


        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;


        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check for the rolled 1; if true, switch to next player..
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //change later..bcos we will always need to display the current score on the current player box and not always at player 1
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    if (playing) {


        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1] + currentscores
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        //2. check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {

        }

        //switch to the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', init);
