let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;
let images = [];

const gameGrid = document.querySelector('.game-grid');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');
const restartBtn = document.getElementById('restart-btn');
const imageInput = document.getElementById('image-input');
const changeImageBtn = document.getElementById('change-image-btn');
const revertNumBtn = document.getElementById("revert");

// Generate grid cells
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        gameGrid.appendChild(cell);
    }
}

// Initialize game
initGame();

// Add event listeners
restartBtn.addEventListener('click', restartGame);
changeImageBtn.addEventListener('click', changeImages);
imageInput.addEventListener('change', handleImageInput);
revertNumBtn.addEventListener('click', revertNum);

// Game logic
function initGame() {
    score = 0;
    scoreDisplay.innerText = score;
    generateRandomTile();
    generateRandomTile();
    drawGrid();
}

function restartGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    initGame();
}

function revertNum() {
    images = [];
    restartGame();
}

function changeImages() {
    imageInput.click();
}

function handleImageInput() {
    const files = imageInput.files;
    if (files.length < 12) {
        alert('Please select 12 images');
        return;
    }
    images = [];
    for (let i = 0; i < 12; i++) {
        //MODIFY TO RESIZE IMAGE
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
            images.push(reader.result);
            if (images.length === 12) {
                drawGrid();
            }
        };
        reader.readAsDataURL(file);
    }
}

function generateRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length === 0) {
        if(gameoverCheck()) {
            highscoreDisplay.innerText = score;
            alert("Game Over");
            //save high score in local storage
        }
        return;
    }
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    grid[randomCell[0]][randomCell[1]] = value;
}

function gameoverCheck() {
    //Column check
    for (let i = 0; i < 4; i++) {
        const arr = [grid[0][i],grid[1][i],grid[2][i],grid[3][i]];
        if(!arrCheck(arr)) {return false};
    }

    //Row check
    for (let i = 0; i < 4; i++) {
        const arr = grid[i];
        if(!arrCheck(arr)) {return false};
    }

    return true;
}

function arrCheck(a) {
    //return false if move possible
    //return true if move not possible
    if(a[0] == a[1]) {
        return false;
    }
    if(a[1] == a[2]) {
        return false;
    }
    if(a[2] == a[3]) {
        return false;
    }
    return true;
}

function drawGrid() {
    const cells = gameGrid.children;
    for (let i = 0; i < 16; i++) {
        const cell = cells[i];
        const value = grid[Math.floor(i / 4)][i % 4];
        if (value === 0) {
            cell.innerHTML = '';
            cell.style.backgroundImage = '';
        } 
        else {
            if (images.length === 12) {
                const index = Math.log2(value) - 1;
                cell.style.backgroundImage = `url(${images[index]})`;
                cell.innerHTML = '';
            } 
            else {
                cell.innerHTML = value;
                cell.style.backgroundImage = '';
            }
        }
    }
}

function moveTiles(direction) {
    switch (direction) {
        case 'up':
            for (let i = 0; i < 4; i++) {
                const column = [grid[0][i], grid[1][i], grid[2][i], grid[3][i]];
                const newColumn = moveColumn(column);
                grid[0][i] = newColumn[0];
                grid[1][i] = newColumn[1];
                grid[2][i] = newColumn[2];
                grid[3][i] = newColumn[3];
            }
            break;
        case 'down':
            for (let i = 0; i < 4; i++) {
                const column = [grid[3][i], grid[2][i], grid[1][i], grid[0][i]];
                const newColumn = moveColumn(column);
                grid[3][i] = newColumn[0];
                grid[2][i] = newColumn[1];
                grid[1][i] = newColumn[2];
                grid[0][i] = newColumn[3];
            }
            break;
        case 'left':
            for (let i = 0; i < 4; i++) {
                const row = grid[i];
                const newRow = moveRow(row);
                grid[i] = newRow;
            }
            break;
        case 'right':
            for (let i = 0; i < 4; i++) {
                const row = grid[i].reverse();
                const newRow = moveRow(row);
                grid[i] = newRow.reverse();
            }
            break;
    }
    generateRandomTile();
    drawGrid();
}

function moveColumn(column) {
    const newColumn = [];
    for (let i = 0; i < 4; i++) {
        if (column[i] !== 0) {
            newColumn.push(column[i]);
        }
    }
    while (newColumn.length < 4) {
        newColumn.push(0);
    }
    for (let i = 0; i < 3; i++) {
        if (newColumn[i] === newColumn[i + 1]) {
            newColumn[i] *= 2;
            newColumn.splice((i+1),1)
            newColumn.push(0);
            score += newColumn[i];
        }
    }
    return newColumn;
}

function moveRow(row) {
    const newRow = [];
    for (let i = 0; i < 4; i++) {
        if (row[i] !== 0) {
            newRow.push(row[i]);
        }
    }
    while (newRow.length < 4) {
        newRow.push(0);
    }
    for (let i = 0; i < 3; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow.splice((i+1),1)
            newRow.push(0);
            score += newRow[i];
        }
    }
    return newRow;
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveTiles('up');
            break;
        case 'ArrowDown':
            moveTiles('down');
            break;
        case 'ArrowLeft':
            moveTiles('left');
            break;
        case 'ArrowRight':
            moveTiles('right');
            break;
    }
    scoreDisplay.innerText = score;
});