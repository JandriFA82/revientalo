// Pantallas
const menuScreen = document.getElementById("menu");
const optionsScreen = document.getElementById("options");
const gameScreen = document.getElementById("game");

// Botones
const btnStart = document.getElementById("btnStart");
const btnOptions = document.getElementById("btnOptions");
const btnExit = document.getElementById("btnExit");
const btnBack = document.getElementById("btnBack");
const btnMenu = document.getElementById("btnMenu");

// Función para cambiar de pantalla
function showScreen(screen) {
    menuScreen.classList.remove("active");
    optionsScreen.classList.remove("active");
    gameScreen.classList.remove("active");

    screen.classList.add("active");
}

// Eventos
btnStart.addEventListener("click", () => {
    showScreen(gameScreen);
});

btnOptions.addEventListener("click", () => {
    showScreen(optionsScreen);
});

btnBack.addEventListener("click", () => {
    showScreen(menuScreen);
});

btnMenu.addEventListener("click", () => {
    showScreen(menuScreen);
});

btnExit.addEventListener("click", () => {
    alert("Gracias por jugar a revientalo 🦆");
});
