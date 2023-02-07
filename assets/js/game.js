//  content dom load
//  set/pick the difficulty function
//  player click the player deck to pick one hand
//  one round starts
//  bot pick a hand randomly
//  check player and bot hands for win lose tie
//  update result match & text placeholders
//  update rounds total-left & wins
//  check if rounds-left = 0
//  if yes then stop game
//  check if wins = 3
//  if yes open new level in session storage & remove disbaled class from next-button
//  next-button clicked. update difficulty to next level

document.addEventListener('DOMContentLoaded', function contentLoaded(){
    //console.log(difficulty);

    //  add eventlistener to player-deck to start a round
    let playerDeck = document.getElementsByClassName('deck');
    for (const hand of playerDeck) {
        console.log(hand.textContent);
        hand.addEventListener('click', playRound, false);
    }
});


function playRound(ev){
    ev.preventDefault();
    console.log(this.textContent);
    let playerHand = this.textContent;
    let botdeck = botPick(playerHand);
   /*
    console.log('playerHand: ' + playerHand);
    console.log('botHand: ' + botdeck.hand);
    console.log('botHand: ' + botdeck.handText);*/

    /*if(botdeck.result == 'WIN'){
        console.log(botdeck.handText);
    }*/
    //  check rounds = 0
    //  round = 0 stop game

    //  check wins = 3
    //  update sessionStorage.openLevel & remove disbaled class from next-level button

    //  check playerhand & bothand for
    //  win tie lose

    //  update result accordingly textcontent
    //  update rounds textcontent
}

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
 * game logic for level cloud
 */
function cloudPick(playerHand){
    let retObj;
    if(playerHand == 'ROCK'){
        retObj = deckPick(rockDeck, rockText, result, cloudIf);
    }
    return retObj;
}

/**
 * private function for 4 logic fucntions
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