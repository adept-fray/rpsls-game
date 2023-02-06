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
    console.log(difficulty);

    //  add eventlistener to player-deck to start a round
    let playerDeck = document.getElementsByClassName('deck');
    for (const hand of playerDeck) {
        console.log(hand.textContent);
        hand.addEventListener('click', playRound, false);
    }
});

function playRound(ev){
    ev.preventDefault();
    let playerHand = this.textContent;
    let botHand = botPick();
    console.log('playerHand: ' + playerHand);
    console.log('botHand: ' + botHand);

    //  check rounds = 0
    //  round = 0 stop game

    //  check wins = 3
    //  update sessionStorage.openLevel & remove disbaled class from next-level button

    //  check playerhand & bothand for
    //  win tie lose

    //  update result accordingly textcontent
    //  update rounds textcontent
}

function botPick(random){
    /*
    let random = ( Math.floor(Math.random() * 100) + 1 );
    let difficulty = sessionStorage.difficultyName ? sessionStorage.difficultyName : 'cloud';
    if(difficulty == 'cloud'){
        cloudPick(random);
    } else if(difficulty == 'snowman'){
        snowmanPick(random);
    } else if(difficulty == 'dove'){
        dovePick(random);
    } else if(difficulty == 'leaf'){
        leafPick(random);
    }*/
    return 'PAPER';
}