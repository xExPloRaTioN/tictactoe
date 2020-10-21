//HTML Elements
const statusDiv= document.querySelector(".status");
const resetDiv= document.querySelector(".reset");
const cellDivs= document.querySelectorAll(".game-cell");


//game constant
const xSymbol = "×";
const oSymbol = "○";

//game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;


//function
const letterToSymbol = (letter) => letter == "x" ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner == "x"){
        statusDiv.innerHTML = `${winner} hat gewonnen!`
    } else {
            statusDiv.innerHTML = `<span>${letterToSymbol(winner)} hat gewonnen! </span>`;
    }

};


const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];
    
    
    //is there a winner
    if(topLeft && topLeft == topMiddle && topLeft == topRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add ("won");
        cellDivs[1].classList.add ("won");
        cellDivs[2].classList.add ("won");
    } else if (middleLeft && middleLeft == middleMiddle && middleMiddle == middleRight ) {
        handleWin(middleLeft);
        cellDivs[3].classList.add ("won");
        cellDivs[4].classList.add ("won");
        cellDivs[5].classList.add ("won");
    } else if (bottomLeft && bottomLeft == bottomMiddle && bottomMiddle == bottomRight) {
        handleWin(bottomLeft);
        cellDivs[6].classList.add ("won");
        cellDivs[7].classList.add ("won");
        cellDivs[8].classList.add ("won");
    } else if (topLeft && topLeft == middleLeft && topLeft == bottomLeft) {
        handleWin(topLeft);
        cellDivs[0].classList.add ("won");
        cellDivs[3].classList.add ("won");
        cellDivs[6].classList.add ("won");
    } else if (topMiddle && topMiddle == middleMiddle && middleMiddle && bottomMiddle) {
        handleWin(topMiddle);
        cellDivs[1].classList.add ("won");
        cellDivs[4].classList.add ("won");
        cellDivs[7].classList.add ("won");
    } else if (topRight && topRight == middleRight && topRight == bottomRight) {
        handleWin(topRight);
        cellDivs[2].classList.add ("won");
        cellDivs[5].classList.add ("won");
        cellDivs[8].classList.add ("won");
    } else if (topLeft && topLeft == middleMiddle && topLeft == bottomRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add ("won");
        cellDivs[4].classList.add ("won");
        cellDivs[8].classList.add ("won");
    } else if (topRight && topRight == middleMiddle && topRight == bottomLeft) {
        handleWin(topRight);
        cellDivs[2].classList.add ("won");
        cellDivs[4].classList.add ("won");
        cellDivs[6].classList.add ("won");
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = "Unentschieden"
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} ist dran!`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} ist dran! </span>`;
        }
    }
    };





//event Handlers
const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} ist dran!`;
    winner = null;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove ("x");
        cellDiv.classList.remove ("o");
        cellDiv.classList.remove ("won");
    }
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (classList[1] == "x" || classList[1] == "o") {
        return;
    }

    if (xIsNext) {
        classList.add("x");
        checkGameStatus()
    } else {
        classList.add("o");
        checkGameStatus()
    }
};



//eventlisteners
resetDiv.addEventListener("click", handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener("click", handleCellClick)

}

