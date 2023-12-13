// Game Constants & Variables---
let inputDirection = { x: 0, y: 0 };
const gameoverSound = new Audio('/sounds/game-over.mp3');
const foodSound = new Audio('/sounds/eating-sound.mp3');
let speed = 9;
let score = 0;
let LastPaintTime = 0;
let SnakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };


// Game Functions---
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - LastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    LastPaintTime = ctime;
    gameEngine();
}

function iscollapsed(snake) {
    // If the snake bumps into itself--
    for (let i = 1; i < SnakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    //If the snake bumps into the wall--
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}





function gameEngine() {
    // Part1: Upadating the snake Array and Food
    if (iscollapsed(SnakeArr)) {
        gameoverSound.play();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over. Press any key to continue.");
        SnakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // When food is eaten increment the score and generate the Food---
    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        foodSound.play();
        score += 2;

        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            HscoreBox.innerHTML = " High Score:" + highscoreval;
        }

        Scorebox.innerHTML = " Score:" + score;
        SnakeArr.unshift({ x: SnakeArr[0].x + inputDirection.x, y: SnakeArr[0].y + inputDirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the Snake---
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };
    }

    SnakeArr[0].x += inputDirection.x;
    SnakeArr[0].y += inputDirection.y;


    // Part2: Display the snake and Food---
    // Display the Snake--
    gameBlock.innerHTML = " ";
    SnakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        gameBlock.appendChild(snakeElement);

    });

    // Display the food--
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    gameBlock.appendChild(foodElement);


}


// Game Logic---
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    HscoreBox.innerHTML = " High Score:" + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 };  //Start the Game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});



