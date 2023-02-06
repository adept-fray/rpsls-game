document.addEventListener('DOMContentLoaded', function(){
    let levels = document.querySelectorAll('a[data-level');

    openLevel(levels);

    for (const level of levels) {
        console.log(level.firstElementChild);
        level.addEventListener('click', iconSet());
    }
});


/**
 * to remove disbaled class and open the correct level(s)
 * in level.html page
 */
function openLevel(levels){
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
    ev.preventDefault();
    sessionStorage('iconName', this.firstElementChild.className)
}