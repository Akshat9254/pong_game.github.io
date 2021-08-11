alert("Instructions:\nPress w for moving Left Paddle Upwards\nPress s for moving Left Paddle Downwards\nPress ArrowUp for moving Right Paddle Upwards\nPress ArrowDown for moving Right Paddle Downwards\nReady!!!\nPress OK to Start");

let player1Lives = 3;
let player2Lives = 3;

let ball = document.querySelector(".ball");
let speedX = 1;
let speedY = 1;

let board = document.querySelector(".board");
let boardCord = board.getBoundingClientRect();
let boardTopCord = boardCord.top;
let boardLeftCord = boardCord.left;
let boardBottomCord = boardCord.bottom;
let boardRightCord = boardCord.right;

let leftPaddle = document.querySelector(".left-paddle");
let rightPaddle = document.querySelector(".right-paddle");

function moveBall () {
    let ballCord = ball.getBoundingClientRect();
    let ballTopCord = ballCord.top;
    let ballLeftCord = ballCord.left;
    let ballBottomCord = ballCord.bottom;
    let ballRightCord = ballCord.right;
    

    // check if any player has touched horizontal boundary
    let hasTouchedLeft = ballLeftCord < boardLeftCord;
    let hasTouchedRight = ballRightCord > boardRightCord;

    if(hasTouchedLeft || hasTouchedRight) {
        if(hasTouchedLeft) {
            player1Lives--;
            changeLivesColor(player1Lives);
            if(player1Lives === 0) {
                alert("Player 2 Won");
                window.location.reload();
            } else {
                return resetGame();
            }
        } else {
            player2Lives--;
            changeLivesColor(player2Lives + 3);
            if(player2Lives === 0) {
                alert("Player 1 Won");
                window.location.reload();
            } else {
                return resetGame();
            }
        }
    }
    

    // check for ball to be in board
    // vetical check
    if(ballTopCord <= boardTopCord || ballBottomCord >= boardBottomCord) {
        speedY = -speedY;

    }
    // horizontal check
    if(ballLeftCord <= boardLeftCord || ballRightCord >= boardRightCord) {
        speedX = -speedX;
    }


    // paddle-ball collision
    let leftPaddleCord = leftPaddle.getBoundingClientRect();
    let rightPaddleCord = rightPaddle.getBoundingClientRect();

    if(ballLeftCord <= leftPaddleCord.right && ballRightCord > leftPaddleCord.left && ballTopCord + 40 >= leftPaddleCord.top && ballBottomCord - 40 <= leftPaddleCord.bottom) {
        speedX = -speedX;
        increaseSpeed(speedX, speedY);
    }
    if(ballRightCord >= rightPaddleCord.left && ballLeftCord < rightPaddleCord.right && ballTopCord + 40 >= rightPaddleCord.top && ballBottomCord - 40 <= rightPaddleCord.bottom) {
        speedX = -speedX;
        increaseSpeed(speedX, speedY);
    }

    ball.style.top = ballTopCord + speedY + "px";
    ball.style.left = ballLeftCord + speedX + "px";
    
    requestAnimationFrame(moveBall);

}

function movePaddle (paddle, change) {
    let paddleCord = paddle.getBoundingClientRect();
    if(paddleCord.top + change >= boardTopCord && paddleCord.bottom + change <= boardBottomCord) {
        paddle.style.top = paddleCord.top + change + "px";
    }
}

function resetGame () {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.48 + "px";
    speedX = 1;
    speedY = 1;
    requestAnimationFrame(moveBall);
}

function changeLivesColor(idx) {
    let LivesIcons = document.querySelectorAll(".fas.fa-circle");
    LivesIcons[idx].style.color = "#FF3D68";
}

function increaseSpeed(x, y) {
    if(x < 0) speedX--;
    else if(x > 0) speedX++;

    if(y < 0) speedY--;
    else if(y > 0) speedY++;

}


document.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    
    if(keyPressed === 'w') {
        movePaddle(leftPaddle, -window.innerHeight * 0.1);
    } else if(keyPressed === 's') {
        movePaddle(leftPaddle, window.innerHeight * 0.1);
    } else if(keyPressed === 'ArrowUp') {
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    } else if(keyPressed === 'ArrowDown') {
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }

})


requestAnimationFrame(moveBall);