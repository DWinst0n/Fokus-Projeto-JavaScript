const botoesContexto = document.querySelectorAll(".app__card-button");
const timer = document.getElementById("timer");
let minutos;
let segundos;
let isRunning = false;

window.addEventListener("load", () => {document.querySelector("button").click();})
const title = document.querySelector(".app__title");

botoesContexto.forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        botao.classList.add("active");

        let btnTxt = botao.textContent.trim().toLowerCase().split(" ");
        let contexto = btnTxt.join("-");
        document.querySelector("html").dataset.contexto = contexto;
        document.querySelector(".app__image").src = `imagens/${contexto}.png`;
        switch (botao.dataset.contexto) {
            case "short":
                minutos = 5;
                segundos = 0;
                title.innerHTML = `                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
            case "long":
                minutos = 15;
                segundos = 0;
                title.innerHTML = `                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
            default:
                minutos = 25;
                segundos = 0;
                title.innerHTML = `                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
        }
    });
    if (isRunning) {

    } else {

    }
});
let intervalId;
const mainButton = document.getElementById("start-pause");
const mainBtnTxt = document.querySelector(`.${mainButton.className} span`);

mainButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        const playSom = new Audio("sons/play.wav");
        playSom.play();
        mainBtnTxt.textContent = "Pausar";
        startTimer();
        botoesContexto.forEach(b => {b.style.display = "none";})
    } else {
        isRunning = false;
        const pauseSom = new Audio("sons/pause.mp3");
        pauseSom.play();
        mainBtnTxt.textContent = "Começar";
        clearInterval(intervalId);
        botoesContexto.forEach(b => {b.style.display = "block";})
    }
});

function startTimer() {
    intervalId = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalId);
                isRunning = false;
                mainBtnTxt.textContent = "Começar";
                return;
            } else {
                minutos--;
                segundos = 59;
            }
        } else {
            segundos--;
        }
        timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }, 1000);
}

const botaoMusica = document.getElementById("alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
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
