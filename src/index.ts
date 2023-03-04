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
} from './setup';
// Helpers
import { createBricks } from './helpers';

// Time
import { clock } from './data';
clock();

let gameOver = false;
let score = 0;
const title = document.getElementById('title') as HTMLElement;
const win = document.getElementById('win') as HTMLElement;
const start = document.getElementById('start') as HTMLElement;
const soundOff = document.getElementById('mute') as HTMLElement;
const lineMute = document.querySelector('.line');

const pressStartInfo = document.getElementById('info') as HTMLElement;

// Title game
setTimeout(() => {
    title.style.opacity = '1';
    title.style.scale = '1';
}, 400);

let timerId: NodeJS.Timer;
function startInterval() {
    timerId = setInterval(() => {
        pressStartInfo.style.visibility = pressStartInfo.style.visibility == 'visible' ? 'hidden' : 'visible';
    }, 750);
}
startInterval();

// async play sound
let volumeValue = 0.7;

export function playSoundAsync(url: string) {
    const sound = new Audio();
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

start.addEventListener('click', () => {
    title.style.display = 'none';
    playSoundAsync(urlTrack.start);
    start.setAttribute('disabled', 'disabled');
});

// EN RU Changer
let languages = 'en';

// Game
let idLevel = 0;
const increaseLevel = () => idLevel++;
const resetLevel = () => {
    idLevel = 0;
};

function setGameOver(view: CanvasView) {
    if (languages == 'en') {
        view.drawInfo('Game Over!');
    } else {
        view.drawInfo('Игра окончена!');
    }
    gameOver = false;
    playSoundAsync(urlTrack.gameover);
    resetLevel();
    start.removeAttribute('disabled');
}

function setGameWin(view: CanvasView) {
    if (languages == 'en') {
        view.drawInfo('Level Complete!');
    } else {
        view.drawInfo('Уровень пройден!');
    }
    gameOver = false;
    playSoundAsync(urlTrack.win);
    increaseLevel();
    start.removeAttribute('disabled');
    if (idLevel >= 3) {
        resetLevel();
        view.clear();
        congratulations();
        win.style.opacity = '1';
        win.style.scale = '1';
    }
}

function congratulations() {
    if (languages == 'en') {
        win.innerHTML = `
        <p>Congratulations! You win the game.</p>
        <img src="images/cool.png">`;
    } else {
        win.innerHTML = `
        <p>Поздравляем! Вы прошли игру.</p>
        <img src="images/cool.png">`;
    }
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
    startInterval();
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    view.drawLevel(idLevel);
    clearInterval(timerId);
    win.innerHTML = '';
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

// Languages

export const langButton = document.querySelector('.lang') as HTMLElement;
const startButton = document.getElementById('start') as HTMLElement;

let selectedP: HTMLElement;

function highlight(p: HTMLElement) {
    if (selectedP) {
        // убрать существующую подсветку, если есть
        selectedP.classList.remove('active');
    }
    selectedP = p;
    selectedP.classList.add('active'); // подсветить новый p
}

langButton.addEventListener('click', (e) => {
    const pEnRu = document.querySelectorAll('.lang p');
    const p = (e.target as HTMLTextAreaElement).closest('p') as HTMLElement;
    if (!p) return;
    pEnRu.forEach((item) => item.classList.remove('active'));
    highlight(p);
    if (p) {
        languages = p.textContent as string;
        view.getLang = p.textContent as string;
    }
    if (p.textContent == 'en') {
        start.textContent = 'Start';
    } else {
        start.textContent = 'Старт';
    }
});

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);
