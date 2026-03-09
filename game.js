// Pantallas
const menuScreen = document.getElementById("menu");
const optionsScreen = document.getElementById("options");
const gameScreen = document.getElementById("game");

// Botones
const btnStart = document.getElementById("btnStart");
const btnOptions = document.getElementById("btnOptions");

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
// PATOS - PRIMERA VERSIÓN
// =======================

const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");

let score = 0;
const DUCK_SPEED = 3;
let ducksOnScreen = 0;
const MAX_DUCKS = 3;

// cada pato, puntaje, color, velocidad
const duckTypes = [
    {
        color: "blue",
        points: 10,
        speed: 2,
        turn: 0.1,
        image: "assets/images/duck_blue.png"
    },
    {
        color: "red",
        points: 20,
        speed: 3,
        turn: 0.15,
        image: "assets/images/duck_red.png"
    },
    {
        color: "purple",
        points: 30,
        speed: 4,
        turn: 0.4,
        image: "assets/images/duck_purple.png"
    },
    {
        color: "gold",
        points: 50,
        speed: 5,
        turn: 0.2,
        image: "assets/images/duck_gold.png"
    }
];
// Crear un pato 
function createDuck() {
    if (ducksOnScreen >= MAX_DUCKS) return;

    const randomDuck =
        duckTypes[Math.floor(Math.random() * duckTypes.length)];

    const duck = document.createElement("img");
    duck.src = randomDuck.image;
    duck.classList.add("duck");

    gameArea.appendChild(duck);
    ducksOnScreen++;

// Posición aleatoria dentro del área de juego
    const duckSize = 80;

    const maxX = gameArea.clientWidth - duckSize;
    const maxY = gameArea.clientHeight - duckSize;

// elegir lado aleatorio
    const side = Math.floor(Math.random() * 4);

    let x, y;

    if (side === 0) { // arriba
        x = Math.random() * maxX;
        y = 0;
    }

    else if (side === 1) { // abajo
        x = Math.random() * maxX;
        y = maxY;
    }

    else if (side === 2) { // izquierda
        x = 0;
        y = Math.random() * maxY;
    }

    else { // derecha
        x = maxX;
        y = Math.random() * maxY;
    }

    duck.style.left = x + "px";
    duck.style.top = y + "px";
// Movimiento aleatorio
    let dx = (Math.random() * 2 - 1) * randomDuck.speed;
    let dy = (Math.random() * 2 - 1) * randomDuck.speed;
    
// Evento al disparar
    duck.addEventListener("click", () => {
        score += randomDuck.points;
        scoreElement.textContent = score;
        cancelAnimationFrame(duck.movementId);
        duck.remove();
        ducksOnScreen--;
    });

//movimiento del pato aleatorio
    function moveDuck() {
    let x = duck.offsetLeft;
    let y = duck.offsetTop;

    // variación aleatoria de dirección
    dx += (Math.random() - 0.5) * 0.3;
    dy += (Math.random() - 0.5) * 0.3;

// limitar velocidad
    dx = Math.max(-randomDuck.speed, Math.min(randomDuck.speed, dx));
    dy = Math.max(-randomDuck.speed, Math.min(randomDuck.speed, dy));

    x += dx;
    y += dy;

// Rebotar en los bordes
    if (x <= 0 || x >= gameArea.clientWidth - duck.clientWidth) {
        dx *= -1;
    }

    if (y <= 0 || y >= gameArea.clientHeight - duck.clientHeight) {
        dy *= -1;
    }

    duck.style.left = x + "px";
    duck.style.top = y + "px";

    duck.movementId = requestAnimationFrame(moveDuck);
}

moveDuck();


}

// Generador automático de patos
setInterval(() => {
    if (gameScreen.classList.contains("active")) {
        createDuck();
    }
}, 1500);