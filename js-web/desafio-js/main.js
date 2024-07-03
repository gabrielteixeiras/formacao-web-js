const listaDeBotoes = document.querySelectorAll(".botao");
const inputTel = document.querySelector("input[type=tel]");

for (let contador = 0; contador < listaDeBotoes.length; contador++) {

    const teclas = listaDeBotoes[contador];

    teclas.onclick = function () {
        inputTel.value = inputTel.value + teclas.value;
    }
}