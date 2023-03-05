import { Vector } from '../types';

let touchstartX = 0;
let touchendX = 0;
const DETECT_TRESHHOLD = 5;
const canvas = document.getElementById('#playField') as HTMLCanvasElement;

export class Paddle {
    private paddleImage: HTMLImageElement = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(
        private speed: number,
        private paddleWidth: number,
        private paddleHeight: number,
        private position: Vector,
        image: string
    ) {
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage.src = image;

        // Event Listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
    }

    // Getters
    get width(): number {
        return this.paddleWidth;
    }

    get height(): number {
        return this.paddleHeight;
    }

    get pos(): Vector {
        return this.position;
    }

    get image(): HTMLImageElement {
        return this.paddleImage;
    }

    get isMovingLeft(): boolean {
        return this.moveLeft;
    }

    get isMovingRight(): boolean {
        return this.moveRight;
    }

    movePaddle(): void {
        if (this.moveLeft) this.pos.x -= this.speed;
        if (this.moveRight) this.pos.x += this.speed;
    }

    handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = false;
        if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = false;
    };

    handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = true;
        if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = true;
    };

    handleTouchStart = (e: TouchEvent): void => {
        touchstartX = e.changedTouches[0].screenX;
    };
    handleTouchEnd = (e: TouchEvent): void => {
        touchendX = 0;
        this.changeDirection();
        console.log('Stop');
    };

    handleTouchMove = (e: TouchEvent): void => {
        touchendX = e.changedTouches[0].screenX;
        this.changeDirection();
        console.log(touchendX);
    };

    changeDirection(): void {
        if (!touchendX) {
            this.moveLeft = false;
            this.moveRight = false;
            return;
        }

        if (touchendX < touchstartX) {
            this.moveLeft = true;
        }
        if (touchendX > touchstartX) {
            this.moveRight = true;
        }
    }
}
