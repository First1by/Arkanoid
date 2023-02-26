const inc = 1000;
const getHours = document.querySelector('.hour') as HTMLElement;
const getMinute = document.querySelector('.minute') as HTMLElement;
const getSecond = document.querySelector('.second') as HTMLElement;

export function clock() {
    const date = new Date();

    const hours = ((date.getHours() + 11) % 12) + 1;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    getHours.style.transform = `rotate(${hour}deg)`;
    getMinute.style.transform = `rotate(${minute}deg)`;
    getSecond.style.transform = `rotate(${second}deg)`;
}

setInterval(clock, inc);
