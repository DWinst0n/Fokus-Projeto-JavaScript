import { initTimer, startTimer, botoesContexto, isRunning, intervalId } from './js/timer.js';
import { initTasks } from './js/tasks.js';
import { carregarTarefasDoLocalStorage } from './js/crudScript.js';

let timerRunning = isRunning;

window.addEventListener("load", () => {
    initTimer();
    initTasks();
    carregarTarefasDoLocalStorage();
});

const mainButton = document.getElementById("start-pause");
const mainBtnTxt = document.querySelector(`.${mainButton.className} span`);
const mainBtnImg = document.querySelector(`.${mainButton.className} img`);

mainButton.addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        const playSom = new Audio("assets/sons/play.wav");
        playSom.play();
        mainBtnTxt.textContent = "Pausar";
        mainBtnImg.src = "assets/imagens/pause.png";
        startTimer();
        botoesContexto.forEach(b => { b.style.display = "none"; });
    } else {
        timerRunning = false;
        const pauseSom = new Audio("assets/sons/pause.mp3");
        pauseSom.play();
        mainBtnTxt.textContent = "Começar";
        mainBtnImg.src = "assets/imagens/play_arrow.png";
        clearInterval(intervalId);
        botoesContexto.forEach(b => { b.style.display = "block"; });
    }
});
const botaoMusica = document.getElementById("alternar-musica");
const musica = new Audio("assets/sons/luna-rise-part-one.mp3");
botaoMusica.addEventListener("click", () => {
    if (botaoMusica.checked) {
        musica.play();
        musica.addEventListener("ended", () => {
            musica.currentTime = 0;
            musica.play();
        })
    } else {
        musica.pause();
    }
})