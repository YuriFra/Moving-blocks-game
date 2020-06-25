//start position player
let player = document.getElementById("rabbit");
player.style.bottom = '15px';
player.style.left = '300px';
player.style.position = 'absolute';

//detect which key is pressed
function keyPress(e) {
    console.log(player.style.left);
    console.log(player.style.bottom);
    if (e.key === 'ArrowLeft' && parseInt(player.style.left) > 0) {
        player.style.left = parseInt(player.style.left) - 5 + 'px';
        player.style.transform = 'rotateY(180deg)';
    } else if (e.key === 'ArrowUp' && parseInt(player.style.bottom) < 410) {
        e.preventDefault();
        player.style.bottom = parseInt(player.style.bottom) + 5 + 'px';
    } else if (e.key === 'ArrowRight' && parseInt(player.style.left) < 724) {
        player.style.left = parseInt(player.style.left) + 5 + 'px';
        player.style.transform = 'rotateY(0deg)';
    } else if (e.key === 'ArrowDown' && parseInt(player.style.bottom) > 0) {
        e.preventDefault();
        player.style.bottom = parseInt(player.style.bottom) - 5 + 'px';
    }
    console.log(e);
}
//move player when arrow key is pressed
document.body.addEventListener('keydown', keyPress);

//start position of enemies
let enemies = document.querySelectorAll('.enemies');
enemies[0].style.left = '0px';
enemies[0].style.bottom = '0px';
enemies[1].style.left = '100px';
enemies[1].style.bottom = '410px';
enemies[2].style.left = '600px';
enemies[2].style.bottom = '300px';

//move element randomly around in div
enemies.forEach(enemy => {
    enemy.style.position = 'absolute';
    enemy.style.width = '100px';
    function moveEnemy() {
        if (parseInt(enemy.style.left) < parseInt(player.style.left)) {
            enemy.style.left = parseInt(enemy.style.left) + 5 + 'px';
            enemy.style.transform = 'rotateY(180deg)';
        } else {
            enemy.style.left = parseInt(enemy.style.left) - 5 + 'px';
            enemy.style.transform = 'rotateY(0deg)';
        }
        if (parseInt(enemy.style.bottom) < parseInt(player.style.bottom)) {
            enemy.style.bottom = parseInt(enemy.style.bottom) + 5 + 'px';
        } else {
            enemy.style.bottom = parseInt(enemy.style.bottom) - 5 + 'px';
        }
    }
    setInterval(moveEnemy, 500);
});

//define position of an element
let element = document.getElementById('some-id');
let position = element.getBoundingClientRect();
let x = position.left;
let y = position.top;
