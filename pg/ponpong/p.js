const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Criar a bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
};

// Criar as raquetes
const paddleWidth = 10;
const paddleHeight = 100;
const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
};
const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
};

// Mover a raquete do jogador
document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    player.y = event.clientY - rect.top - player.height / 2;
});

// Desenhar a bola
function drawBall() {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Desenhar as raquetes
function drawPaddle(paddle) {
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Atualizar a posição da bola
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com o teto e o chão
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Colisão com as raquetes
    if (ball.x - ball.radius < player.x + player.width && 
        ball.y > player.y && 
        ball.y < player.y + player.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > computer.x && 
        ball.y > computer.y && 
        ball.y < computer.y + computer.height) {
        ball.dx *= -1;
    }

    // Marcar ponto e reiniciar a bola
    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }

    // Mover a raquete do computador
    computer.y += ((ball.y - (computer.y + computer.height / 2)) * 0.1);
}

// Reiniciar a bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1; // muda a direção
}

// Desenhar tudo
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(player);
    drawPaddle(computer);
}

// Atualizar e desenhar a cada quadro
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();
