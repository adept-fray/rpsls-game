document.addEventListener('DOMContentLoaded', function(){
    sessionStorage.setItem('startRounds', '11');
    sessionStorage.setItem('startWins', '0');
    sessionStorage.setItem('wins', sessionStorage.getItem('startWins'));
    sessionStorage.setItem('roundsLeft', sessionStorage.getItem('startRounds'));

    let levels = document.querySelectorAll('a[data-level');

    openLevel();

    for (const level of levels) {
        level.addEventListener('click', iconSet, false);
        level.addEventListener('click', difficultySet, false);
    }
});


/**
 * to remove disbaled class and open the correct level(s)
 * in level.html page
 */
function openLevel(){
    let levels = document.querySelectorAll('a[data-level');
    switch(sessionStorage.openLevel){
        case 'leaf':
            levels[3].classList.remove('disabled');
        case 'dove':
            levels[2].classList.remove('disabled');
        case 'snowman':
            levels[1].classList.remove('disabled');
        case 'cloud':
        default:
            levels[0].classList.remove('disabled');
            break;
    }
}


/**
 * set icon name for background icon
 * used in game.html page
 */
function iconSet(ev){
    sessionStorage.setItem('iconName', this.firstElementChild.className)
}

/**
 * on click update the level difficulty to the clicked level
 */
function difficultySet(ev){
    sessionStorage.setItem('difficultyName', this.id);
}