'use strict';

// selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');



const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// let scores;
// let currentScore;
// let activePlayer;
// let playing;

// or we can declare in one line like below
let scores,currentScore,activePlayer,playing;
// Starting conditions or restoring the all values to initial stage

const init = function(){

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add("hidden");


    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

//  calling init() function
init();

//switch to next player function
const switchPlayer = function(){
            // switch to next player


        // setting the current score value of 1st player to 0.
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        currentScore=0;

        // change the value pf active player to switch player
        // we will change this value by using turnary operator
        activePlayer = activePlayer=== 0 ? 1 : 0 ;

        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

}

//Rolling the dice functionality

btnRoll.addEventListener('click',function(){

    if(playing){

    // 1. Generating a random number between 1 to 6 for dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;



    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);

    //3. Check for rolled dice number is 1 or not : if true, then switch to next player
    if(dice !== 1){
        // Add dice number to current score
        currentScore+=dice;

        // // manually selecting current score element
        // currentScore0El.textContent = currentScore; // CHANGE LATER

        // Selecting current score element dynamically
        document.getElementById(`current--${activePlayer}`). textContent = currentScore;

    }else{
        // switch to next player
        switchPlayer();
    }
}

});

btnHold.addEventListener('click',function(){
    if(playing){
    // console.log('Hold Button');

    //1. Add Current score to active playes's score
    scores[activePlayer]+=currentScore;
    // scores[1] = scores[1] +  currentScore

    // console.log(scores[activePlayer]);


    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Check if player's score is >=100
    // finish the game
    if(scores[activePlayer]>=100){
        playing = false;

        diceEl.classList.add('hidden');

        // console.log(`Active palyer : ${activePlayer}`)
        
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{

        //Switch to the next player
        switchPlayer();
    }
}
});

// new game functionality
btnNew.addEventListener('click',init);
 