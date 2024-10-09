const player = document.getElementById('player');
const bulletsContainer = document.getElementById('bullets');
const enemiesContainer = document.getElementById('enemies');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

let score = 0;
let level = 1;
let bulletSpeed = 10;

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.random() * (760) + 'px'; // Width - enemy width
    enemy.style.top = '20px'; // Start above
    enemiesContainer.appendChild(enemy);

    const moveInterval = setInterval(() => {
        const enemyTop = parseInt(enemy.style.top);
        if (enemyTop > 400) {
            clearInterval(moveInterval);
            enemiesContainer.removeChild(enemy);
        } else {
            enemy.style.top = enemyTop + 2 + 'px';
        }
    }, 100);
}

function shoot() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = player.offsetLeft + 15 + 'px';
    bulletsContainer.appendChild(bullet);

    const shootInterval = setInterval(() => {
        const bulletTop = parseInt(bullet.style.bottom);
        if (bulletTop > 400) {
            clearInterval(shootInterval);
            bulletsContainer.removeChild(bullet);
        } else {
            bullet.style.bottom = bulletTop + bulletSpeed + 'px';
        }

        // Collision detection
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            if (
                bullet.offsetLeft < enemy.offsetLeft + 40 &&
                bullet.offsetLeft + 10 > enemy.offsetLeft &&
                bullet.offsetTop < enemy.offsetTop + 40 &&
                bullet.offsetTop + 5 > enemy.offsetTop
            ) {
                clearInterval(shootInterval);
                bulletsContainer.removeChild(bullet);
                enemiesContainer.removeChild(enemy);
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
            }
        });
    }, 50);
}

function startGame() {
    setInterval(() => {
        createEnemy();
    }, 2000); // Create an enemy every 2 seconds

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            shoot();
        }
    });
}

startGame();
