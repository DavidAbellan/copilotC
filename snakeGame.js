// Obtén el elemento canvas y su contexto
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define el tamaño de cada cuadro en el juego
let box = 32;

// Inicializa la serpiente como un array con una posición inicial
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// Define la dirección inicial de la serpiente
let direction = "right";

// Crea la comida en una posición aleatoria
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Función para dibujar el fondo del juego
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Función para dibujar la serpiente
function createSnake() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Función para dibujar la comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Evento para cambiar la dirección de la serpiente con las teclas de flecha
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Función principal del juego
function startGame() {
    // Si la serpiente llega al borde del canvas, aparece en el lado opuesto
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Si la serpiente se choca consigo misma, termina el juego
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Dibuja el fondo, la serpiente y la comida
    createBG();
    createSnake();
    drawFood();

    // Define la nueva posición de la serpiente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mueve la serpiente en la dirección actual
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Si la serpiente come la comida, genera una nueva comida en una posición aleatoria
    // Si no, quita el último elemento de la serpiente (la mueve)
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Añade un nuevo elemento al frente de la serpiente (la mueve)
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Inicia el juego y lo actualiza cada 100 milisegundos
let game = setInterval(startGame, 100);