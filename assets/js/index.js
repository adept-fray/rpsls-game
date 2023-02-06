
let rightTextCover = document.getElementById('right');
let menuItems = document.getElementsByClassName('menu-item');
for (const tab of menuItems) {
    console.log(tab);
    tab.addEventListener('click', activeContent);
}

function activeContent(ev){
    ev.preventDefault();
    let todo = `<p>
    Win to last 
    <br> 
    level 
    <br>
    Win the last 
    <br>
    level
  </p>`;
    let prize = `<p>
    Free purchase of the next
    <br> 
    game release 
    <br>
    and purchase of one
    <br>
    limited edition merchandise
  </p>`;
    let about = `<p>
    Free to play game
    <br> 
    for a chance to 
    <br>
    recieve exlusive rewards
    <br>
    only available to players that finishes the game
  </p>`;

    for (const tab of menuItems) {
        tab.classList.remove('active');
    }
    this.classList.add('active');
    if(this.textContent == 'To-do'){
        rightTextCover.innerHTML = todo;
    } else if(this.textContent == 'Prize'){
        rightTextCover.innerHTML = prize;
    } else if(this.textContent == 'About'){
        rightTextCover.innerHTML = about;
    }
}