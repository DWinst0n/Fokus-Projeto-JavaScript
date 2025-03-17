export const botoesContexto = document.querySelectorAll(".app__card-button");
export const timer = document.getElementById("timer");
export let minutos;
export let segundos;
export let isRunning = false;
export let currentContextIndex = 0;
export let intervalId;

export function initTimer() {
    const title = document.querySelector(".app__title");
    botoesContexto.forEach((botao, index) => {
        botao.addEventListener("click", () => {
            document.querySelector(".active")?.classList.remove("active");
            botao.classList.add("active");
            currentContextIndex = index;

            let btnTxt = botao.textContent.trim().toLowerCase().split(" ");
            let contexto = btnTxt.join("-");
            document.querySelector("html").dataset.contexto = contexto;
            document.querySelector(".app__image").src = `assets/imagens/${contexto}.png`;
            switch (botao.dataset.contexto) {
                case "short":
                    minutos = 5;
                    segundos = 0;
                    title.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                    break;
                case "long":
                    minutos = 15;
                    segundos = 0;
                    title.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                    break;
                default:
                    minutos = 25;
                    segundos = 0;
                    title.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
                    break;
            }
            timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        });
    });
    botoesContexto[0].click();
}

export function startTimer() {
    const mainBtnTxt = document.querySelector("#start-pause span"); 
    intervalId = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalId);
                isRunning = false;
                mainBtnTxt.textContent = "Começar";
                const terminouSom = new Audio("assets/sons/beep.mp3");
                terminouSom.play();
                botoesContexto.forEach(b => { b.style.display = "block"; });
                autoAlternarProximoContexto();
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

function autoAlternarProximoContexto() {
    let nextIndex;
    if (currentContextIndex === 0) {
        nextIndex = Math.random() < 0.5 ? 1 : 2;
    } else {
        nextIndex = 0;
    }
    currentContextIndex = nextIndex;
    botoesContexto[nextIndex].click();
}