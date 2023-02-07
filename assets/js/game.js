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
    updateBackgroundIcon();
    resetUIElements();
});


/**
 * plays one round after player has picked a hand
 * @param {event object} ev 
 */
function playRound(ev){
    ev.preventDefault();
    console.log(this.textContent);
    let playerHand = this.textContent;
    let botDeck = botPick(playerHand);
    console.log('playerHand: ' + playerHand);
    console.log('botHand: ' + botDeck.hand);
    console.log('botHand: ' + botDeck.handText);

    let rounds = {
        wins: Number(sessionStorage.getItem('wins')),
        roundsLeft: Number(sessionStorage.getItem('roundsLeft'))
    };
    console.log(rounds);

    inrementDecrementRounds(rounds, botDeck.result);

    if(rounds.roundsLeft <= 0){
        // end game
        endGame();
    }
    if(rounds.wins == 3 && !sessionStorage.getItem('win3')){
        let nextButton = document.getElementById('next_level');
        nextButton.classList.remove('disabled');
        nextButton.addEventListener('click', function(){
            resetUIElements();
            nextDifficultyName();
            nextIconName();
            updateBackgroundIcon();
        });
        updateOpenLevel();
        sessionStorage.setItem('win3', 'true');
        console.log(nextButton);
        if(sessionStorage.getItem('difficultyName') == 'leaf'){
            //  end game
            endGame();
            //  show modall form to get email
        }
    }

    
    sessionStorage.setItem('wins', rounds.wins.toString());
    sessionStorage.setItem('roundsLeft', rounds.roundsLeft.toString());

    updateUIElements(botDeck);
}

/**
 * choose the level difficulty logic same as the current level
 * @param {*} playerHand 
 * @returns object
 */
function botPick(playerHand){
    let difficulty = sessionStorage.getItem('difficultyName') ? sessionStorage.getItem('difficultyName') : 'cloud';
    console.log(difficulty);
    let retObj = {};
    if(difficulty == 'cloud'){
        //console.log('inside cloudIf logic');
        retObj = botPickHand(playerHand, cloudIf);
    } else if(difficulty == 'snowman'){
        //console.log('inside snowmanIf logic');
        retObj = botPickHand(playerHand, snowmanIf);
    } else if(difficulty == 'dove'){
        //console.log('inside doveIf logic');
        retObj = botPickHand(playerHand, doveIf);
    } else if(difficulty == 'leaf'){
        //console.log('inside leafIf logic');
        retObj = botPickHand(playerHand, leafIf);
    }
    return retObj;
}

/**
 * logic to pick the deck same as player hand
 * @param {*} playerHand 
 * @returns object
 */
function botPickHand(playerHand, levelIf){
    let retObj;
    if(playerHand == 'ROCK'){
        retObj = deckPick(rockDeck, rockText, result, levelIf);
    } else if(playerHand == 'PAPER'){
        retObj = deckPick(paperDeck, paperText, result, levelIf);
    } else if(playerHand == 'SCISSORS'){
        retObj = deckPick(scissorsDeck, scissorsText, result, levelIf);
    } else if(playerHand == 'LIZARD'){
        retObj = deckPick(lizardDeck, lizardText, result, levelIf);
    } else if(playerHand == 'SPOCK'){
        retObj = deckPick(spockDeck, spockText, result, levelIf);
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
function updateOpenLevel(){
    switch (sessionStorage.getItem('difficultyName')) {
        case 'dove':
            sessionStorage.setItem('openLevel', 'leaf');
            break;
        case 'snowman':
            sessionStorage.setItem('openLevel', 'dove');
            break;
        case 'cloud':
            sessionStorage.setItem('openLevel', 'snowman');
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

/**
 * update UI elements on page load and every round
 * @param {*} botDeck 
 */
function updateUIElements(botDeck){
    let resultEl = document.getElementById('round_result');
    let resultTextEl = document.getElementById('round_result_text');
    let roundsLeftEl = document.getElementById('rounds_left');
    let totalWinsEl = document.getElementById('total_wins');

    resultEl.textContent = botDeck.result;
    resultTextEl.textContent = botDeck.handText;
    roundsLeftEl.textContent = 'Rounds: ' + sessionStorage.getItem('roundsLeft');
    totalWinsEl.textContent = 'Wins: ' + sessionStorage.getItem('wins');
}


function resetUIElements(){
    let resultEl = document.getElementById('round_result');
    let resultTextEl = document.getElementById('round_result_text');
    let roundsLeftEl = document.getElementById('rounds_left');
    let totalWinsEl = document.getElementById('total_wins');


    resultEl.textContent = '';
    resultTextEl.textContent = '';
    roundsLeftEl.textContent = 'Rounds: ' + sessionStorage.getItem('startRounds');
    totalWinsEl.textContent = 'Wins: ' + sessionStorage.getItem('startWins');
}

function updateBackgroundIcon(){
    let backIcon = document.getElementById('background_icon');
    backIcon.firstElementChild.className = sessionStorage.getItem('iconName');
}

function nextDifficultyName(){
    switch (sessionStorage.getItem('difficultyName')) {
        case 'dove':
            sessionStorage.setItem('difficultyName', 'leaf');
            break;
        case 'snowman':
            sessionStorage.setItem('difficultyName', 'dove');
            break;
        case 'cloud':
            sessionStorage.setItem('difficultyName', 'snowman');
            break;
    }
}


function nextIconName(){
    switch (sessionStorage.getItem('iconName')) {
        case 'fa-solid fa-dove':
            sessionStorage.setItem('iconName', 'fa-solid fa-leaf');
            break;
        case 'fa-solid fa-snowman':
            sessionStorage.setItem('iconName', 'fa-solid fa-dove');
            break;
        case 'fa-solid fa-cloud-rain':
            sessionStorage.setItem('iconName', 'fa-solid fa-snowman');
            break;
    }
}