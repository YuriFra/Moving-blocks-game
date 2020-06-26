//hide images onload
let player = document.getElementById("rabbit");
let enemies = Array.from(document.querySelectorAll('.enemies'));
player.style.display = 'none';
enemies.forEach(enemy => {
    enemy.style.display = 'none';
});

//start game by clicking start button
document.getElementById('start').addEventListener('click', () => {
    let loopEnemies;
    let check = [];
    const moveP = 15;
    const moveE = 5;

    //start position player
    player.style.display = 'block';
    player.style.bottom = '15px';
    player.style.left = '300px';
    player.style.position = 'absolute';

    //start position enemies
    enemies.forEach(enemy => {
        enemy.style.position = 'absolute';
        enemy.style.display = 'block';
    });
    enemies[0].style.left = '0px';
    enemies[0].style.bottom = '0px';
    enemies[1].style.left = '100px';
    enemies[1].style.bottom = '410px';
    enemies[2].style.left = '600px';
    enemies[2].style.bottom = '300px';

    //timer function
    let min = document.getElementById("minutes");
    let sec = document.getElementById("seconds");
    let totalSec = 0;
    function Timer() {
        totalSec++;
        sec.innerHTML = (totalSec % 60).toString().padStart(2, '0');
        min.innerHTML = Math.floor(totalSec / 60).toString().padStart(2, '0');
    }
    let time = setInterval(Timer, 1000);

    //detect collision
    function checkCollision(enemy) {
        let playerPos = player.getBoundingClientRect();
        let enemyPos = enemy.getBoundingClientRect();
        if (!(
            playerPos.top > enemyPos.bottom ||
            playerPos.right < enemyPos.left ||
            playerPos.bottom < enemyPos.top ||
            playerPos.left > enemyPos.right
        )){
            check.push(true);
        } else {
            check.push(false);
        }
    }
    setInterval(countLives,500);

    //detect which key is pressed & move player on keypress
    function movePlayer(e) {
        if (e.key === 'ArrowLeft' && parseInt(player.style.left) > 0) {
            player.style.left = parseInt(player.style.left) - moveP + 'px';
            player.style.transform = 'rotateY(0deg)';
        } else if (e.key === 'ArrowUp' && parseInt(player.style.bottom) < 405) {
            e.preventDefault();
            player.style.bottom = parseInt(player.style.bottom) + moveP + 'px';
        } else if (e.key === 'ArrowRight' && parseInt(player.style.left) < 724) {
            player.style.left = parseInt(player.style.left) + moveP + 'px';
            player.style.transform = 'rotateY(180deg)';
        } else if (e.key === 'ArrowDown' && parseInt(player.style.bottom) > 0) {
            e.preventDefault();
            player.style.bottom = parseInt(player.style.bottom) - moveP + 'px';
        }
        check = [];
        enemies.forEach(enemy => {
            checkCollision(enemy);
        })
    }
    document.body.addEventListener('keydown', movePlayer);

    //move enemies chasing player
    function moveEnemy(enemy) {
        if (parseInt(enemy.style.left) < parseInt(player.style.left)) {
            enemy.style.left = parseInt(enemy.style.left) + moveE + 'px';
            enemy.style.transform = 'rotateY(180deg)';
        } else {
            enemy.style.left = parseInt(enemy.style.left) - moveE + 'px';
            enemy.style.transform = 'rotateY(0deg)';
        }
        if (parseInt(enemy.style.bottom) < parseInt(player.style.bottom)) {
            enemy.style.bottom = parseInt(enemy.style.bottom) + moveE + 'px';
        } else {
            enemy.style.bottom = parseInt(enemy.style.bottom) - moveE + 'px';
        }
        checkCollision(enemy);
    }
    function iterateEnemies(){
        enemies.forEach(enemy => moveEnemy(enemy))
    }
    loopEnemies = setInterval(iterateEnemies, 500);

    //subtract lives on collision & clearInterval when lives are finished
    let lives = document.querySelectorAll('.lives');
    let counter = -1;
    function countLives() {
        if (check.some(index => index)) {
            if (counter !== 2) {
                counter++;
            }
            lives[counter].src = "img/lost.png";
        }
        if (counter === 2) {
            clearInterval(time);
            clearInterval(loopEnemies);
            document.getElementById('gameOver').innerText = "GAME OVER!";
            player.src = "img/lost.png";
        }
    }
});

//reset button
document.getElementById('reset').addEventListener('click', () => {
    location.reload();
});
