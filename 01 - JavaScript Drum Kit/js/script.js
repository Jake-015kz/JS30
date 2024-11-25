const  keys = document.querySelectorAll('.key');

function keyClicked() {
    const keyCode = this.dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    
    if(audio) {
        audio.currentTime = 0;
        audio.play();

        this.classList.add('playing');

        this.addEventListener('transitionend', () => {
            this.classList.remove('playing');
        },{once: true}
    );
    }
}

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    
    if(key) {
        key.click();
    }
});



keys.forEach(key => key.addEventListener('click', keyClicked));