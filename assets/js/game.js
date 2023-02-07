//  check player and bot hands for win lose tie
//  update result match & text placeholders
//  update rounds total-left & wins
//  check if rounds-left = 0
//  if yes then stop game
//  check if wins = 3
//  if yes open new level in session storage & remove disbaled class from next-button
//  next-button clicked. update difficulty to next level

document.addEventListener('DOMContentLoaded', function contentLoaded(){
    //  add eventlistener to player-deck to start a round
    let playerDeck = document.getElementsByClassName('deck');
    for (const hand of playerDeck) {
        console.log(hand.textContent);
        hand.addEventListener('click', playRound, false);
    }
});


/**
 * plays one round after player has picked a hand
 * @param {event object} ev 
 */
function playRound(ev){
    ev.preventDefault();
    console.log(this.textContent);
    let playerHand = this.textContent;
    let botdeck = botPick(playerHand);
    console.log('playerHand: ' + playerHand);
    console.log('botHand: ' + botdeck.hand);
    console.log('botHand: ' + botdeck.handText);

    let rounds = {
        wins: Number(sessionStorage.getItem('wins')),
        roundsLeft: Number(sessionStorage.getItem('roundsLeft'))
    };
    console.log(rounds);
    inrementDecrementRounds(rounds, botdeck.result);

    if(rounds.roundsLeft <= 0){
        // end game
        endGame();
    }
    if(rounds.wins == 3 && !sessionStorage.getItem('win3')){
        sessionStorage.setItem('win3', 'true');
        let nextButton = document.getElementById('next-level');
        console.log(nextButton);
        nextButton.classList.remove('disabled');
        updateDifficultyName();
        if(sessionStorage.getItem('difficultyName') == 'leaf'){
            //  end game
            endGame();
            //  show modall form to get email
        }
    }

    sessionStorage.setItem('wins', rounds.wins.toString());
    sessionStorage.setItem('roundsLeft', rounds.roundsLeft.toString());
    //  check rounds = 0
    //  round = 0 stop game

    //  check wins = 3
    //  update sessionStorage.openLevel & remove disbaled class from next-level button

    //  check playerhand & bothand for
    //  win tie lose

    //  update result accordingly textcontent
    //  update rounds textcontent
}

/**
 * choose the level difficulty logic same as the current level
 * @param {*} playerHand 
 * @returns object
 */
function botPick(playerHand){
    let difficulty = sessionStorage.difficultyName ? sessionStorage.difficultyName : 'cloud';
    console.log(difficulty);
    let retObj = {};
    if(difficulty == 'cloud'){
        retObj = cloudPick(playerHand);
    }
    return retObj;
}

/**
 * logic to pick the deck same as player hand
 * @param {*} playerHand 
 * @returns object
 */
function cloudPick(playerHand){
    let retObj;
    if(playerHand == 'ROCK'){
        retObj = deckPick(rockDeck, rockText, result, cloudIf);
    }
    return retObj;
}


/**
 * check the round result, bot hand and its corresponding text
 * @param {deck of hands} deck 
 * @param {text relative to hands} deckText 
 * @param {result of the round} result 
 * @param {array to use for if condition} ifValues 
 * @returns object
 */
function deckPick(deck, deckText, result, ifValues){
    let retObj = {};
    let random = (Math.floor(Math.random() * 100) + 1);
    for(let i = 0; i < 5; i++){
        if(random <= ifValues[i]){
            retObj.hand = deck[i];
            retObj.result = result[i];
            retObj.handText = deckText[i];
            
            //console.log('inside of deck pick');
            //console.log(retObj);
            return retObj;
        }
    }
}

/**
 * result of round corresponding to bot decks
 */
let result = ['WIN', 'WIN', 'LOSE', 'LOSE', 'TIE'];

/**
 * if values to compare to random number
 */
let cloudIf = [30, 59, 88, 94, 100]; /*[20, 40, 60, 80, 100]; to make it more easy*/
let snowmanIf = [25, 60, 75, 87, 100]; /*[15, 30, 53, 76, 100] */
let doveIf = [20, 40, 60, 80, 100]; /*[11, 22, 48, 74, 100]*/
let leafIf = [15, 30, 53, 76, 100]; /*[6, 12, 41, 70, 100]*/

/**
 * bot decks corresponding to result of round
 */
let rockDeck = ['SCISSORS', 'LIZARD', 'SPOCK', 'PAPER', 'ROCK'];
let paperDeck = ['ROCK', 'SPOCK', 'SCISSORS', 'LIZARD', 'PAPER'];
let lizardDeck = ['PAPER', 'SPOCK', 'ROCK', 'SCISSORS', 'LIZARD'];
let scissorsDeck = ['PAPER', 'LIZARD', 'SPOCK', 'ROCK', 'SCISSORS'];
let spockDeck = ['ROCK', 'SCISSORS', 'PAPER', 'LIZARD', 'SPOCK'];

/**
 * result text corresponding to bot decks
 */
let rockText = ['ROCK crushes SCISSORS', 'ROCK crushes LIZARD', 'SPOCK vaporizes ROCK', 'PAPER covers ROCK', 'ROCK'];
let paperText = ['PAPER covers ROCK', 'PAPER disproves SPOCK', 'SCISSORS cuts PAPER', 'LIZARD eats PAPER', 'PAPER'];
let lizardText = ['LIZARD eats PAPER', 'LIZARD poisons SPOCK', 'ROCK crushes LIZARD', 'SCISSORS dicapitates LIZARD', 'LIZARD'];
let scissorsText = ['SCISSORS cuts PAPER', 'SCISSORS dicapitates LIZARD', 'SPOCK smashes SCISSORS', 'ROCK crushes SCISSORS', 'SCISSORS'];
let spockText = ['SPOCK vaporizes ROCK', 'SPOCK smashes SCISSORS', 'PAPER disproves SPOCK', 'LIZARD poisons SPOCK', 'SPOCK'];


/**
 * increment or decrement wins and roundsLeft localy
 * @param {local copy of sessionStorage} rounds 
 * @param {result of the round} result 
 */
function inrementDecrementRounds(rounds, result){
    console.log(rounds)
    if(result == 'WIN'){
        rounds.wins++;
        rounds.roundsLeft = rounds.roundsLeft - 1;
        console.log('inside increment decrement wins: ' + rounds.wins);
        console.log('inside increment decrement rounds left: ' + rounds.roundsLeft);
    } else if(result == 'LOSE'){
        rounds.roundsLeft = rounds.roundsLeft - 1;
        console.log('inside increment decrement rounds left: ' + rounds.roundsLeft);
    } else if(result == 'TIE'){
        rounds.roundsLeft = rounds.roundsLeft - 1;
        console.log('inside increment decrement rounds left: ' + rounds.roundsLeft);
    }
}


/**
 * update the sessionStorag variable difficultyName to be the highest playable level
 */
function updateDifficultyName(){
    switch (sessionStorage.difficultyName) {
        case 'dove':
            sessionStorage.difficultyName = 'leaf';
            break;
        case 'snowman':
            sessionStorage.difficultyName = 'dove';
            break;
        case 'cloud':
            sessionStorage.difficultyName = 'snowman';
            break;
    }
}

/**
 * end the game by disabling the deck buttons
 */
function endGame(){
    let deck = document.getElementsByClassName('deck');
        for (const hand of deck) {
            console.log(hand);
            hand.classList.add('disabled');
        }
}