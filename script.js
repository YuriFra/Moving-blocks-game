document.getElementById('start').addEventListener('click', () => {
    let collision = false;
    let moveE;
    let array = [];

    //start position player
    let player = document.getElementById("rabbit");
    player.style.bottom = '15px';
    player.style.left = '300px';
    player.style.position = 'absolute';

    //start position enemies
    let enemies = Array.from(document.querySelectorAll('.enemies'));
    enemies[0].style.left = '0px';
    enemies[0].style.bottom = '0px';
    enemies[1].style.left = '100px';
    enemies[1].style.bottom = '410px';
    enemies[2].style.left = '600px';
    enemies[2].style.bottom = '300px';
    enemies.forEach(enemy => {
        enemy.style.position = 'absolute';
        enemy.style.width = '100px';
    });

    //timer function
    let min = document.getElementById("minutes");
    let sec = document.getElementById("seconds");
    let totalSec = 0;
    function Timer() {
        totalSec++;
        sec.innerHTML = (totalSec % 60).toString().padStart(2, '0');
        min.innerHTML = parseInt(totalSec / 60).toString().padStart(2, '0');
    }
    let time = setInterval(Timer, 1000);

    function checkCollision(enemy) {
        let playerPos = player.getBoundingClientRect();
        let enemyPos = enemy.getBoundingClientRect();
        if (!(
            playerPos.top > enemyPos.bottom ||
            playerPos.right < enemyPos.left ||
            playerPos.bottom < enemyPos.top ||
            playerPos.left > enemyPos.right
        )){
            array.push(true);
            console.log("DEAD");
        } else {
            array.push(false);
        }
    }
    setInterval(() => {
        countLives();
    },1000);

    //detect which key is pressed & move player on keypress
    function keyPress(e) {
        if (e.key === 'ArrowLeft' && parseInt(player.style.left) > 0) {
            player.style.left = parseInt(player.style.left) - 15 + 'px';
            player.style.transform = 'rotateY(180deg)';
        } else if (e.key === 'ArrowUp' && parseInt(player.style.bottom) < 410) {
            e.preventDefault();
            player.style.bottom = parseInt(player.style.bottom) + 15 + 'px';
        } else if (e.key === 'ArrowRight' && parseInt(player.style.left) < 724) {
            player.style.left = parseInt(player.style.left) + 15 + 'px';
            player.style.transform = 'rotateY(0deg)';
        } else if (e.key === 'ArrowDown' && parseInt(player.style.bottom) > 0) {
            e.preventDefault();
            player.style.bottom = parseInt(player.style.bottom) - 15 + 'px';
        }
        array = [];
        enemies.forEach(enemy => {
            //detect collision
            checkCollision(enemy);
        })
    }
    document.body.addEventListener('keydown', keyPress);

    function moveEnemy(enemy) {
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
        checkCollision(enemy);
    }
    function iterateEnemies(){
        array = [];
        enemies.forEach(enemy => moveEnemy(enemy))
    }
    moveE = setInterval(iterateEnemies, 500);

    //clearInterval when lives are gone
    let lives = document.querySelectorAll('.lives');
    let counter = -1;
    function countLives() {
        if (array.some(index => index)) {
            if (counter !== 2) {
                counter++;
            }
            lives[counter].src = "img/lost.png";
        }
        if (counter === 2) {
            clearInterval(time);
            clearInterval(moveE);
        }
    }
});

/* define position of player with getBoundingClientRect()
function checkPlayerPos() {
    let x = playerPos.left;
    let y = playerPos.top;
    let w = playerPos.width;
    let h = playerPos.height;
    console.log("Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h);
}
checkPlayerPos(); */
