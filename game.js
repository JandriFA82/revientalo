// Pantallas
const menuScreen = document.getElementById("menu");
const optionsScreen = document.getElementById("options");
const gameScreen = document.getElementById("game");

// Botones
const btnStart = document.getElementById("btnStart");
const btnOptions = document.getElementById("btnOptions");
const btnBack = document.getElementById("btnBack");
const btnMenu = document.getElementById("btnMenu");

// Elementos juego
const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");
const shotsElement = document.getElementById("shots");
const difficultySelect = document.getElementById("difficulty");

// Variables
let score = 0;
let shotsLeft = 25;
let difficulty = "normal";
let ducksOnScreen = 0;
const MAX_DUCKS = 3;

// =======================
// CAMBIO DE PANTALLA
// =======================
function showScreen(screen) {
    menuScreen.classList.remove("active");
    optionsScreen.classList.remove("active");
    gameScreen.classList.remove("active");

    screen.classList.add("active");
}

// =======================
// EVENTOS UI
// =======================
btnStart.addEventListener("click", () => {
    showScreen(gameScreen);

    const settings = difficultySettings[difficulty];
    shotsLeft = settings.shots;

    score = 0;

    scoreElement.textContent = score;
    shotsElement.textContent = shotsLeft;

    createDuck();
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

// =======================
// DISPAROS 
// =======================
gameArea.addEventListener("click", () => {
    if (shotsLeft <= 0) return;
    shotsLeft--;
    shotsElement.textContent = shotsLeft;

    console.log("Disparo:", shotsLeft);
});

// =======================
// NIVELES
// =======================
difficultySelect.addEventListener("change", () => {
    difficulty = difficultySelect.value;
});

const difficultySettings = {
    easy: { shots: 30 },
    normal: { shots: 25 },
    hard: { shots: 20 }
};

// =======================
// TIPOS DE PATOS
// =======================
const duckTypes = [
    { points: 10, speed: 2, image: "assets/images/duck_blue.png" },
    { points: 20, speed: 3, image: "assets/images/duck_red.png" },
    { points: 30, speed: 4, image: "assets/images/duck_purple.png" },
    { points: 50, speed: 5, image: "assets/images/duck_gold.png" }
];

// =======================
// CREAMOS LOS PATOS
// =======================
function createDuck() {
    if (ducksOnScreen >= MAX_DUCKS) return;

    const randomDuck = duckTypes[Math.floor(Math.random() * duckTypes.length)];

    const duck = document.createElement("img");
    duck.src = randomDuck.image;
    duck.classList.add("duck");

    gameArea.appendChild(duck);
    ducksOnScreen++;

    const lifetime = 8000 + Math.random() * 1000;

    duck.timeoutId = setTimeout(() => {
        if (duck.parentElement) {
            cancelAnimationFrame(duck.movementId);
            duck.remove();
            ducksOnScreen--;
        }
    }, lifetime);

    // Posición inicial
    const duckSize = 80;
    const maxX = gameArea.clientWidth - duckSize;
    const maxY = gameArea.clientHeight - duckSize;

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    duck.style.left = x + "px";
    duck.style.top = y + "px";

    // Movimiento
    let dx = (Math.random() * 2 - 1) * randomDuck.speed;
    let dy = (Math.random() * 2 - 1) * randomDuck.speed;

    duck.addEventListener("click", (e) => {
        e.stopPropagation(); // evita disparo doble

        score += randomDuck.points;
        scoreElement.textContent = score;

        cancelAnimationFrame(duck.movementId);
        clearTimeout(duck.timeoutId);

        duck.remove();
        ducksOnScreen--;
    });

    function moveDuck() {
        let x = duck.offsetLeft;
        let y = duck.offsetTop;

        dx += (Math.random() - 0.5) * 0.3;
        dy += (Math.random() - 0.5) * 0.3;

        dx = Math.max(-randomDuck.speed, Math.min(randomDuck.speed, dx));
        dy = Math.max(-randomDuck.speed, Math.min(randomDuck.speed, dy));

        x += dx;
        y += dy;

        if (x <= 0 || x >= gameArea.clientWidth - duck.clientWidth) dx *= -1;
        if (y <= 0 || y >= gameArea.clientHeight - duck.clientHeight) dy *= -1;

        duck.style.left = x + "px";
        duck.style.top = y + "px";

        duck.movementId = requestAnimationFrame(moveDuck);
    }

    moveDuck();
}

// =======================
// SPAUNEO DE LOS PATOS
// =======================
setInterval(() => {
    if (gameScreen.classList.contains("active")) {
        createDuck();
    }
}, 1500);