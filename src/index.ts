import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Collision } from './Collison';
// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY,
    LEVEL,
    // LEVEL1,
} from './setup';
// Helpers
import { createBricks } from './helpers';
// import { lineDrawing } from './anime';

let gameOver = false;
let score = 0;
const lineDrawing = document.getElementById('lineDrawing') as HTMLElement;
const start = document.getElementById('start') as HTMLElement;
const soundOff = document.getElementById('mute') as HTMLElement;
const lineMute = document.querySelector('.line');

setTimeout(() => {
    lineDrawing.style.opacity = '1';
    lineDrawing.style.scale = '1';
}, 400);

// async play sound
const sound = new Audio();
let volumeValue = 0.7;

export function playSoundAsync(url: string) {
    sound.src = `${url}`;
    sound.play();
    sound.volume = volumeValue;
}

const urlTrack: { [key: string]: string } = {
    start: './audio/sfx-1.mp3',
    gameover: './audio/sfx-2.mp3',
    win: './audio/win.mp3',
    collision: './audio/sfx-3.mp3',
};

// Sound controls - on/off

soundOff.onclick = function (): void {
    if (volumeValue != 0) {
        volumeValue = 0;
        lineMute?.classList.toggle('hide-line');
    } else {
        volumeValue = 0.7;
        lineMute?.classList.toggle('hide-line');
    }
};

start.onclick = function (): void {
    lineDrawing.style.display = 'none';
};

// Game
let idLevel = 0;
const increaseLevel = () => idLevel++;
const resetLevel = () => (idLevel = 0);
const dataLevel = `LEVEL${idLevel}`;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!');
    gameOver = false;
    playSoundAsync(urlTrack.gameover);
    resetLevel();
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won!');
    gameOver = false;
    playSoundAsync(urlTrack.win);
    increaseLevel();
}

function gameLoop(view: CanvasView, bricks: Brick[], paddle: Paddle, ball: Ball, collision: Collision) {
    console.log('draw!');
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    // Move Ball
    ball.moveBall();

    // Move paddle and check so it won't exit the playfield
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
        playSoundAsync(urlTrack.collision);
    }

    // Game Over when ball leaves playField
    if (ball.pos.y > view.canvas.height) gameOver = true;
    // If game won, set gameOver and display win
    if (bricks.length === 0) return setGameWin(view);
    // Return if gameover and don't run the requestAnimationFrame
    if (gameOver) return setGameOver(view);

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
    // Reset displays
    playSoundAsync(urlTrack.start);
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    view.drawLevel(idLevel);
    // Create a collision instance
    const collision = new Collision();
    // Create all bricks
    const bricks = createBricks(LEVEL, idLevel);
    // Create a Ball
    const ball = new Ball(BALL_SPEED, BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE);
    // Create a Paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5,
        },
        PADDLE_IMAGE
    );

    gameLoop(view, bricks, paddle, ball, collision);
}

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);
