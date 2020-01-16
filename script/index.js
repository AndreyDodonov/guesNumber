'use strict';

const userInput = document.querySelector('#user-input');
const resultMessage = document.querySelector('.result');
const counter = document.querySelector('.attempts-counter');
const checkBtn = document.querySelector('#check-button');

let loseCounter = localStorage.getItem('loseCounter'),
    cpuNumber = Number(localStorage.getItem('cpuNumber'));

counter.textContent = String(loseCounter); // init value from local storage

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    localStorage.setItem('cpuNumber', String(Math.round(rand)));
    return Math.round(rand);
}

if (cpuNumber === 0) {
    cpuNumber = randomInteger(1, 100);
}


const inputHandler = () => {

    let userNumber = parseInt(userInput.value, 10);
    // validation
    if (userNumber < 1 || userNumber > 100) {
        resultMessage.textContent = `The number must be between 1 and 100 !`;
        userInput.style.borderColor = 'red';
        return;
    } else {
        userInput.style.borderColor = '';
    }
    // handler
    if (+cpuNumber === userNumber) {
        resultMessage.textContent = `You found the number ! )`;
        userInput.value = '';
        loseCounter = 0;
        cpuNumber = randomInteger(1, 100);
        localStorage.setItem('cpuNumber', String(cpuNumber));
        counter.textContent = String(loseCounter);
    } else if (cpuNumber > userNumber) {
        resultMessage.textContent = ` Too low `;
        loseCounter++;
        counter.textContent = String(loseCounter);
        userInput.value = '';
    } else if (cpuNumber < userNumber) {
        resultMessage.textContent = ` Too high `;
        loseCounter++;
        counter.textContent = String(loseCounter);
        userInput.value = '';
    }
    localStorage.setItem('loseCounter', loseCounter);
};


checkBtn.addEventListener('click', inputHandler);

function enterHandler(e) {
    if (e.key === 'Enter') {
        inputHandler();
    }
}

console.log(cpuNumber);
