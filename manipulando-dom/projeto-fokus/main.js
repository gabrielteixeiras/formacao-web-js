const tagHtml = document.querySelector("html");
const focoButton = document.querySelector(".app__card-button--foco");
const curtoButton = document.querySelector(".app__card-button--curto");
const longoButton = document.querySelector(".app__card-button--longo");
const buttons = document.querySelectorAll(".app__card-button");
const comecarButton = document.querySelector("#start-pause span");

const musicaButton = document.getElementById("alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;
const somFinalTemporizador = new Audio("./sons/beep.mp3");
const somIniciarTemporizador = new Audio("./sons/play.wav");
const somPausarTemporizador = new Audio("./sons/pause.mp3");

const texto = document.querySelector(".app__title");
const imagem = document.querySelector(".app__image");
const displayTempo = document.querySelector('#timer');
const startPauseButton = document.getElementById("start-pause");
const pauseImage = document.querySelector(".app__card-primary-butto-icon");

const tempoNaTela = document.getElementById("timer");
let intervaloId = null;
let tempoMilisegundos = 1500;

musicaButton.addEventListener("change", () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoButton.addEventListener("click", () => {
    tempoMilisegundos = 1500;
    alterarContexto("foco");
    focoButton.classList.add("active");
})

curtoButton.addEventListener("click", () => {
    tempoMilisegundos = 300;
    alterarContexto("descanso-curto");
    curtoButton.classList.add("active");
})

longoButton.addEventListener("click", () => {
    tempoMilisegundos = 900;
    alterarContexto("descanso-longo");
    longoButton.classList.add("active");
})

function alterarContexto (contexto) {
    mostrarTempo();
    buttons.forEach(function (contexto){
        contexto.classList.remove("active");
    });
    tagHtml.setAttribute("data-contexto", contexto);
    imagem.setAttribute("src", `./imagens/${contexto}.png`);
    

    switch (contexto) {
        case "foco":
            texto.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa!</strong>`;
            break;
        case "descanso-curto": 
            texto.innerHTML= `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            texto.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
        default:
            break;
    } 
}

const contagemRegressiva = () => {
    if(tempoMilisegundos <= 0) {
        somFinalTemporizador.play();        
        alert(`Tempo finalizado!`);
        zerar();
        return;
    }
    tempoMilisegundos -= 1;
    mostrarTempo();
}

startPauseButton.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        somPausarTemporizador.play();
        zerar();
        return;
    }
    somIniciarTemporizador.play();
    intervaloId = setInterval(contagemRegressiva, 1500);
    comecarButton.textContent = `Pausar`;
    pauseImage.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    comecarButton.textContent = `Continuar`;
    pauseImage.setAttribute("src", "./imagens/play_arrow.png");
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoMilisegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();