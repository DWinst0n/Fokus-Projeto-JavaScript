const botoesContexto = document.querySelectorAll(".app__card-button");


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
                document.querySelector(".app__title").innerHTML = `                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                break;
            case "long":
                document.querySelector(".app__title").innerHTML = `                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                break;
            default:
                document.querySelector(".app__title").innerHTML = `                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
        }
    });
});



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
