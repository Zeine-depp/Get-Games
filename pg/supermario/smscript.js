const mario = document.getElementById('mario');
const game = document.getElementById('game');

let isJumping = false;
let position = 0;

function jump() {
    if (isJumping) return;

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    mario.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 5;
            mario.style.bottom = position + 'px';
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
