'use strict'
var gGameOn = false;
var gCorrectAnswer = 2;
var gTime = 0;
var idIntervel;
var gNums;

function init() {
    gameDifficult()
    createGnums(num);   
}

function createGnums(num) {
    var nums = [];
    for (var i = 1; i <= num; i++) {
        nums.push(i);
    }
    gNums = shuffle(nums)
    renderBoard(gNums);
    
}

function renderBoard(items) {
    var copyItems = items.concat();
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(items.length); i++) {
        strHTML += '<tr>'
        for (var j = 0; j < Math.sqrt(items.length); j++) {
            var cell = drawNum(copyItems) + ''
            strHTML += `<td onclick="cellClicked(this)">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    var elCurrClickedcell = clickedNum
    var elCurrClickedNum = +clickedNum.innerText;
    if (gGameOn === false) {
        if (elCurrClickedNum === 1) {
            elCurrClickedcell.className = 'cellColor';
            gGameOn = true;
            idIntervel = setInterval(gameTime, 1000);
        }
    }
    for (var i = elCurrClickedNum; i <= gNums.length && (gGameOn); i++) {
        if (elCurrClickedNum === gCorrectAnswer) {
            gCorrectAnswer++
            elCurrClickedcell.className = 'cellColor';
            if (elCurrClickedNum === gNums.length) {
                endGame()
                clearInterval(idIntervel);
            }
        }
    }
}

function gameTime() {
    gTime++;
    var strHTML = ''
    var span = document.createElement("span");
    document.body.appendChild(span);
    var elGameTime = document.querySelector('span');
    strHTML = `<span class="time">Game time: ${gTime}</span>`;
    elGameTime.innerHTML = strHTML;

}

function gameDifficult() {
    var strHTML = ''
    var elGameDifficult = document.querySelector('div');
    strHTML = `<button onclick="createGnums(16)">Easy: (4X4)</button>
      <button onclick="createGnums(25)">Hard: (5X5)</button>
   <button onclick="createGnums(36)">Extreme!: (6X6)</button>`
    elGameDifficult.innerHTML = strHTML;
}

function endGame() {
    var elGameDifficult = document.querySelector('.board');
    elGameDifficult.innerHTML = ''
    createPlayAgain();
          
}

function createPlayAgain() {
    var elPlayAgain = document.querySelector('div');
    elPlayAgain.innerHTML = `<h3>Such a winner! for new game press play again</h3><button onclick="reset()">Play Again</button>`
}

function reset() {
    gGameOn = false;
    gCorrectAnswer = 2;
    gTime = 0;
    var elGameTime = document.querySelector('span');
    elGameTime.innerHTML = '';
    init();
}


