/**
 * to remove disbaled class and open the correct level(s)
 */
let levels = document.querySelectorAll('a[data-level');
openLevel();
function openLevel(){
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
 */
for (const level of levels) {
    console.log(level.firstElementChild);
    level.addEventListener('click', iconSet());
}

function iconSet(ev){
    ev.preventDefault();
    sessionStorage('iconName', this.firstElementChild.className)
}