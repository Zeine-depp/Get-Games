const player = document.getElementById('player');
const ball = document.getElementById('ball');
const field = document.getElementById('field');
const goal = document.getElementById('goal');
const opponents = document.querySelectorAll('.opponent');

let playerPosition = 375; // Posição inicial do jogador
let ballPositionX = 390; // Posição inicial da bola
let ballPositionY = 440; // Posição inicial da bola
let score = 0; // Pontuação do jogador
const playerSpeed = 15;
const ballSpeed = 5;

function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= playerSpeed;
    } else if (direction === 'right' && playerPosition < (field.offsetWidth - player.offsetWidth)) {
        playerPosition += playerSpeed;
    }
    player.style.left = playerPosition + 'px';
}

function kickBall() {
    const kickDirection = Math.random() < 0.5 ? -1 : 1; // Chutar para a esquerda ou direita
    const kickDistance = 200; // Distância do chute

    ballPositionX += kickDirection * kickDistance;
    ballPositionY += 20; // Eleva a bola

    if (ballPositionX < 0) ballPositionX = 0; // Limitar a posição da bola
    if (ballPositionX > field.offsetWidth - ball.offsetWidth) ballPositionX = field.offsetWidth - ball.offsetWidth;

    ball.style.left = ballPositionX + 'px';
    ball.style.bottom = ballPositionY + 'px';

    setTimeout(() => {
        ballPositionY -= 20; // A bola desce após o chute
        ball.style.bottom = ballPositionY + 'px';

        if (checkGoal()) {
            alert('Gooool! Você marcou!');
            score++;
            resetBall();
        }
    }, 500);
}

function checkGoal() {
    const ballRect = ball.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();
    
    return (
        ballRect.bottom <= goalRect.top && // A bola está acima do gol
        ballRect.left >= goalRect.left && // A bola está à esquerda do gol
        ballRect.right <= goalRect.right // A bola está à direita do gol
    );
}

function resetBall() {
    ballPositionX = 390; // Posição inicial da bola
    ballPositionY = 440; // Posição inicial da bola
    ball.style.left = ballPositionX + 'px';
    ball.style.bottom = ballPositionY + 'px';
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.code === 'ArrowRight') {
        movePlayer('right');
    } else if (event.code === 'Space') {
        kickBall();
    }
});

// Movimentar os adversários (exemplo básico)
function moveOpponents() {
    opponents.forEach(opponent => {
        let opponentPosition = Math.random() * (field.offsetWidth - opponent.offsetWidth);
        opponent.style.left = opponentPosition + 'px';
    });
}

setInterval(moveOpponents, 2000); // Mover adversários a cada 2 segundos
