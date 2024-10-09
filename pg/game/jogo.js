

const player = document.querySelector('.player');

const jump = () => {
player.classList.add('sjump');
setTimeout(() => {
player.classList.remove('jump');

},500)

}
 
 document.addEventListener('keydown', jump);

