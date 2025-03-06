const botoesContexto = document.querySelectorAll(".app__card-button");
botoesContexto.forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        botao.classList.add("active");

        let btnTxt = botao.textContent.trim().toLowerCase().split(" ");
        let contexto = btnTxt.join("-")
        document.querySelector("html").dataset.contexto = contexto;

        

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
