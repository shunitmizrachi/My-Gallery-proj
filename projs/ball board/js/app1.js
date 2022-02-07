const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = '&#127845'

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gGameStats;
var gIdIntervalAddBalls;
var gIsGlued = false;
var gIdIntervalAddGlue;
var gIdIsGluedTimeOut;
var gIdClearGlueTimeOut


function initGame() {
    gGameStats = {
        ballsCollected: 0,
        ballsOnBoard: 2,
        isGameOn: true,
    }
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    gIdIntervalAddBalls = setInterval(function () {
        addBalls(gBoard)
    }, 10000);
    gIdIntervalAddGlue = setInterval(function () {
        addGlue(gBoard)
    }, 5000);
}

function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if ((i === 0 || i === board.length - 1) && j !== 5 || (j === 0 || j === board[0].length - 1) && i !== 5) {
                cell.type = WALL;
            }

            // Add created cell to The game board
            board[i][j] = cell;
        }
    }

    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;

    console.log(board);
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            //TODO - Change To template string
            strHTML += '\t<td class="cell ' + cellClass +
                '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    console.log('strHTML is:');
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
    if (gIsGlued || !gGameStats.isGameOn) return;

    if (gGamerPos.i === 0 && gGamerPos.j === 5 && i === -1) {
        i = 9;
    }
    
    if (gGamerPos.i === 9 && gGamerPos.j === 5 && i === 10) {
        i = 0;
    } 
    
    if (gGamerPos.i === 5 && gGamerPos.j === 0 && j === -1) {
        j = 11;
    }
    
    if (gGamerPos.i === 5 && gGamerPos.j === 11 && j === 12) {
        j = 0;
    }

    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;
    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (i === 0 && j === 5) || (i === 9 && j === 5) || (i === 5 && j === 0) || (i === 5 && j === 11)) {

        if (targetCell.gameElement === BALL) {
            playSound()
            console.log('Collecting!');
            gGameStats.ballsCollected++
            gGameStats.ballsOnBoard--
            ballsEaten();
            checkVictory();
        } else if (targetCell.gameElement === GLUE) {
            gIsGlued = true;
            gIdIsGluedTimeOut = setTimeout(stopGlued, 3000);
        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);
    }

} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);




// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;

    }

}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function getRandEmptyCoord(board) {
    var currEmptyCells = [];
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            var currEmptyCell = board[i][j];
            if (currEmptyCell.gameElement === null) currEmptyCells.push({ i: i, j: j });
        }

    }
    var randCoord = currEmptyCells[getRandomInt(0, currEmptyCells.length)];
    return randCoord
}

function addBalls(board) {
    var randEmptyCoord = getRandEmptyCoord(board)
    board[randEmptyCoord.i][randEmptyCoord.j].gameElement = BALL;
    renderCell(randEmptyCoord, BALL_IMG);
    gGameStats.ballsOnBoard++
}

function addGlue(board) {
    var randEmptyCoord = getRandEmptyCoord(board)
    board[randEmptyCoord.i][randEmptyCoord.j].gameElement = GLUE;
    renderCell(randEmptyCoord, GLUE);
    gIdClearGlueTimeOut = setTimeout(clearGlue, 5000, randEmptyCoord, board)
}

function stopGlued() {
    gIsGlued = false
}

function clearGlue(coord, board) {
    if (gIsGlued) {
        renderCell(coord, GAMER_IMG);
    } else {
        board[coord.i][coord.j].gameElement = null;
        renderCell(coord, '');
    }
}

function ballsEaten() {
    var elspan = document.querySelector('span');
    elspan.innerHTML = `Number of balls collected:${gGameStats.ballsCollected}`
}

function checkVictory() {
    numBallsOnBoard = gGameStats.ballsOnBoard;
    if (numBallsOnBoard === 0) {
        gGameStats.isGameOn = false;
        clearInterval(gIdIntervalAddBalls);
        clearInterval(gIdIntervalAddGlue);
        clearTimeout(gIdIsGluedTimeOut);
        clearInterval(gIdClearGlueTimeOut)
        var elTbody = document.querySelector('tbody');
        elTbody.style.display = 'none'

        var eldiv = document.querySelector('div');
        eldiv.innerHTML = `<h2>You win!!! press Restart for play again</h2> <button class="restart" onclick="restart()">Restart</button>`;
        eldiv.style.display = 'block';


    }
}
function restart() {
    initGame()
    var elTbody = document.querySelector('tbody');
    elTbody.style.display = 'block';
    var eldiv = document.querySelector('div');
    eldiv.style.display = 'none';
    var elspan = document.querySelector('span');
    elspan.innerHTML = `Number of balls collected:`;
}

function playSound() {
    var audioElement = new Audio("audio/eat.mp3");
    audioElement.play();

}



