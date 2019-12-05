
const gameSpeed = 100;
const canvasBorderColour = "black";
const canvasBackroundColour = "white";
const snakeColour = 'lightgreen';
const snakeBorderColour = 'darkgreen';
const foodColour = 'red';
const foodBorderColour = 'darkred';

let snake = [ 
    {x: 150, y: 150}, 
    {x: 140, y: 150}, 
    {x: 130, y: 150}, 
    {x: 120, y: 150}, 
    {x: 110, y: 150},]

let score = 0;
let changingDirection = false;
let foodX;
let foodY;
let dx = 10;
let dy = 0;

const gameCanvas = document.getElementById("gameCanvas");

const ctx = gameCanvas.getContext("2d");

//Start game
main();

createFood();

document.addEventListener("keydown", changeDirection);

function main() {
    if (didGameEnd()) return; 
        

setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    main();
}, gameSpeed)
}

function clearCanvas() {
    ctx.fillStyle = canvasBackroundColour;
    ctx.strokestyle = canvasBorderColour;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawFood() {
    ctx.fillStyle = foodColour;
    ctx.strokestyle = foodBorderColour
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById('score').innerHTML = score;

        createFood();
    }else {
        snake.pop();
    }
}

function didGameEnd() {
    for (let i = 4 ; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true 
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;  
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) *10;
}

function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);

    //if the new food location is where the snake currently is, create a new location for the food
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) createFood();
    });
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}


function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeColour;
    ctx.strokestyle = snakeBorderColour;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10)
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function changeDirection(event) {
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === leftKey && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === upKey && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === rightKey && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === downKey && !goingUp) {
        dx = 0;
        dy = 10;
    }
}
