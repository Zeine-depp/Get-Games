const bird = document.getElementById("bird");
const game = document.getElementById("game");
let isGameOver = false;
let birdBottom = 250;
let gravity = 2;
let jump = 50;
let pipePosition = 400;

function startGame() {
    if (!isGameOver) {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + "px";
        
        if (birdBottom <= 0) {
            gameOver();
            alert('burro')
        }
        
        pipePosition -= 5;
        if (pipePosition < -50) {
            pipePosition = 400;
        }
        document.querySelector('.pipe').style.right = pipePosition + "px";

        requestAnimationFrame(startGame);
    }
}

function jumpBird() {
    if (birdBottom < 600) {
        birdBottom += jump;
        bird.style.bottom = birdBottom + "px";
    }
}

function gameOver() {
    isGameOver = true;
    alert("Game Over!");
}

document.addEventListener("click", jumpBird);
startGame();
