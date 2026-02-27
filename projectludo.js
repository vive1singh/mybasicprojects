const diceIcon = document.getElementById("dice-icon");
const rollBtn = document.getElementById("roll-dice-btn");
const currentPlayer = document.getElementById("current-player-text");
const winnerOverlay = document.getElementById("declare-winner");
const winnerText = document.getElementById("winner-name");
const playAgainBtn = document.getElementById("play-again-btn");

playAgainBtn.addEventListener("click", () => {
    location.reload();
});

function showWinner(color) {
    winnerText.textContent = color.toUpperCase() + " Wins!";
    winnerOverlay.style.display = "flex";
}

// ===================Turn / Dice Logic : =================
const players = ["red", "blue", "green", "yellow"];
let currentPlayerIndex = 0;
let lastDiceValue = null;
let sixCount = 0;


rollBtn.addEventListener("click", rollDice);

function updateDiceIcon(value) {
    const classMap ={
        1: "fa-dice-one",
        2: "fa-dice-two",
        3: "fa-dice-three",
        4: "fa-dice-four",
        5: "fa-dice-five",
        6: "fa-dice-six",

    };
    diceIcon.className = "fa-solid " + classMap[value];
}

function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer.textContent = 
    "Current Player: " + players[currentPlayerIndex];
    
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    lastDiceValue = diceValue;
    updateDiceIcon(diceValue);
    console.log("Rolled", diceValue, "by", players[currentPlayerIndex]);
    
    
    if (diceValue === 6) {
        sixCount++;
    } else {
        sixCount = 0;
    }

    //  If player rolls three 6s in a row, skip their turn :
    if (sixCount === 3) {
        lastDiceValue = null;
        sixCount = 0;
        nextTurn();
        return;

    }
    // Auto skip If : there is not legal Move :
    const color = players[currentPlayerIndex];
    if (!hasAnyLegalMoveForPlayer(color)) {
        lastDiceValue = null;
        nextTurn();

    }
}


// ===================== Pieces / Paths / Positions =====================
// Red
const redPieces = document.querySelectorAll(".red-piece");
const redPathCells = document.querySelectorAll("#red-path .ludo-box");

// -1 Means its steal standing in the base :
const redPositions = [-1, -1, -1, -1];

// ==== Blue Pieces Logic ==== //

const bluePieces = document.querySelectorAll(".blue-piece");
const bluePathsCells = document.querySelectorAll("#blue-path .ludo-box");
const bluePositions = [-1, -1, -1, -1];

// ==== Green Pieces Logic ==== //

const greenPieces = document.querySelectorAll(".green-piece");
const greenPathsCells = document.querySelectorAll("#green-path .ludo-box");
const greenPositions = [-1, -1, -1, -1];

// ==== Yellow Pieces Logic ==== //

const yellowPieces = document.querySelectorAll(".yellow-piece");
const yellowPathsCells = document.querySelectorAll("#yellow-path .ludo-box");
const yellowPositions = [-1, -1, -1, -1];

// ===============FINISH constants================= 
const FINISH_RED = redPathCells.length - 1;
const FINISH_BLUE = bluePathsCells.length - 1;
const FINISH_GREEN = greenPathsCells.length - 1;
const FINISH_YELLOW = yellowPathsCells.length - 1;


// =============== Home Slot ============== //
const redHomeSlots = document.querySelectorAll("#red-board .home-slot");
const blueHomeSlots = document.querySelectorAll("#blue-board .home-slot");
const greenHomeSlots = document.querySelectorAll("#green-board .home-slot");
const yellowHomeSlots = document.querySelectorAll("#yellow-board .home-slot");

// ===============Helpers================
function getPieceColor(el) {
    return el?.dataset?.color || null;
}

function isBlockadeCell (cell, movingColor) {
    if (!cell) return false;
    // A blockade cell is defined as a cell that contains two pieces of the same color, and that color is not the moving player's color.
    const pieces = Array.from(cell.children).filter(ch => getPieceColor(ch));
    if (pieces.length < 2) return false;

    const firstColor = getPieceColor(pieces[0]);
    if (!firstColor) return false;

    const sameColorCount = pieces.filter(p => getPieceColor(p) === firstColor).length;
    if (sameColorCount >=2) {
        // If the cell has a blockade of a different color than the moving player, it's a blockade cell for that player.
        return firstColor !== movingColor;
    }
        return false;
}

function isPathBlockedByOpponent(pathCells, fromIndex, toIndex, movingColor) {
    // its move foward on game using fromIndex < toIndex
    for (let i = fromIndex + 1; i <= toIndex; i++) {
        const cell = pathCells[i];
        if (isBlockadeCell(cell, movingColor)) return true;    
    }
    return false;
}

// ==============Exact-finish legal move checks=============== 
function canRedPieceMove(pieceIndex, currentPos, dice) {
    if (currentPos === FINISH_RED) return false;

    if (currentPos === -1) {
        if (dice !== 6) return false;
        const targetCell = redPathCells[0];
        if (isBlockadeCell(targetCell, "red")) return false;
        return true;
    }

    const newPos = currentPos + dice;
    if (newPos > FINISH_RED) return false;
    if (isPathBlockedByOpponent(redPathCells, currentPos, newPos, "red")) return false;
    return true;

} 

function canBluePieceMove(pieceIndex,  currentPos, dice) {
    if (currentPos === FINISH_BLUE) return false;

    if (currentPos === -1) {
        if (dice !== 6) return false;
        const targetCell = bluePathsCells[0];
        if (isBlockadeCell(targetCell, "blue")) return false;
        return true;
    }

    const newPos = currentPos + dice;
    if (newPos > FINISH_BLUE) return false;
    if (isPathBlockedByOpponent(bluePathsCells, currentPos, newPos, "blue")) return false;
    return true;

} 

function canGreenPieceMove(pieceIndex,  currentPos, dice) {
    if (currentPos === FINISH_GREEN) return false;

    if (currentPos === -1) {
        if (dice !== 6) return false;
        const targetCell = greenPathsCells[0];
        if (isBlockadeCell(targetCell, "green")) return false;
        return true;
    }

    const newPos = currentPos + dice;
    if (newPos > FINISH_GREEN) return false;
    if (isPathBlockedByOpponent(greenPathsCells, currentPos, newPos, "green")) return false;
    return true;

} 

function canYellowPieceMove(pieceIndex,  currentPos, dice) {
    if (currentPos === FINISH_YELLOW) return false;

    if (currentPos === -1) {
        if (dice !== 6) return false;
        const targetCell = yellowPathsCells[0];
        if (isBlockadeCell(targetCell, "yellow")) return false;
        return true;
    }

    const newPos = currentPos + dice;
    if (newPos > FINISH_YELLOW) return false;
    if (isPathBlockedByOpponent(yellowPathsCells, currentPos, newPos, "yellow")) return false;
    return true;

} 

function hasAnyLegalMoveForPlayer(color) {
    const dice = lastDiceValue;
    if (!dice) return false;

    if(color === "red") {
        return redPositions.some((pos, idx) => canRedPieceMove(idx, pos, dice));
    }
    if(color === "blue") {
        return bluePositions.some((pos, idx) => canBluePieceMove(idx, pos, dice));
    }
    if(color === "green") {
        return greenPositions.some((pos, idx) => canGreenPieceMove(idx, pos, dice));
    }
    if(color === "yellow") {
        return yellowPositions.some((pos, idx) => canYellowPieceMove(idx, pos, dice));
    }
    return false;
}

//  ==============Win Check (all finished) ==================
function checkRedWin() {
    if (redPositions.every((pos) => pos === FINISH_RED)) showWinner("red");
}

function checkBlueWin() {
    if (bluePositions.every((pos) => pos === FINISH_BLUE)) showWinner("blue");
}

function checkGreenWin() {
    if (greenPositions.every((pos) => pos === FINISH_GREEN)) showWinner("green");
}

function checkYellowWin() {
    if (yellowPositions.every((pos) => pos === FINISH_YELLOW)) showWinner("yellow");
}

// ====================Capture Logic :=====================

function sendPieceHome(piece) {
    const color = piece.dataset.color;
    if (!color) return;

    let positionsArray;
    let piecesNodeList;
    let homeSlots;

    if (color === "red") {
        positionsArray = redPositions;
         piecesNodeList = redPieces;
        homeSlots = redHomeSlots;
    } else if (color === "blue") {
        positionsArray = bluePositions;
         piecesNodeList = bluePieces;
        homeSlots = blueHomeSlots;
    } else if (color === "green") {
        positionsArray = greenPositions;
         piecesNodeList = greenPieces;
        homeSlots = greenHomeSlots;
    } else if (color === "yellow") {
        positionsArray = yellowPositions;
         piecesNodeList = yellowPieces;
        homeSlots = yellowHomeSlots;
    }
    else {
        return;
    }
    // Find the index pieces whose this pieces is
    const idx = Array.from(piecesNodeList).indexOf(piece);
    if (idx === -1) return;

    // Set the position array in -1 :
    positionsArray[idx] = -1;

    // Move the piece back to its home slot
    const targetHome = Array.from(homeSlots).find(
    (slot) => slot.children.length === 0
    );

    if (targetHome) {
        targetHome.appendChild(piece);
    }
}

function handleCapture(newCell, myColor) {

    // safe Zone Pieces Must not Be Captured :
    if (newCell.classList.contains("safe")) return;

    const enemyPiece = Array.from(newCell.children).find((child) => {
        return child.dataset.color && child.dataset.color !==
        myColor;
    });

        if (!enemyPiece) return;

        sendPieceHome(enemyPiece);
    }

// === Red Move Function with Capture Logic === //

function moveRedpieceTo(pieceIndex, targetIndex) {
    const currentPos = redPositions[pieceIndex];
    const piece = redPieces[pieceIndex];

    if(currentPos !== -1) {
        const oldCell = redPathCells[currentPos];
        if (oldCell.contains(piece)) {
            oldCell.removeChild(piece);
        }
    } else {
        const parent = piece.parentElement;
        if (parent) parent.removeChild(piece);
    }

    const newCell = redPathCells[targetIndex];

    // First check the Capture Logic :
    handleCapture(newCell, "red");

    // Then insert yours pice in Cell :
    newCell.appendChild(piece);

    // Update the position array :
    redPositions[pieceIndex] = targetIndex;
    checkRedWin();
}

// === Blue Move Function with Capture Logic === //

function moveBluePieceTo(pieceIndex, targetIndex) {
    const currentPos = bluePositions[pieceIndex];
    const piece = bluePieces[pieceIndex];
    if (currentPos !== -1) {
        const oldCell = bluePathsCells[currentPos];
        if (oldCell.contains(piece)) {
            oldCell.removeChild(piece);
        }
    } else {
        const parent = piece.parentElement;
        if (parent) parent.removeChild(piece);
    }

    const newCell = bluePathsCells[targetIndex];

    // First check the Capture Logic :
    handleCapture(newCell, "blue");
    // Then insert yours pice in Cell :
    newCell.appendChild(piece);

    // Update the position array :
    bluePositions[pieceIndex] = targetIndex;
    checkBlueWin();
}

// === Green Move Function with Capture Logic === //

function moveGreenPieceTo(pieceIndex, targetIndex) {
    const currentPos = greenPositions[pieceIndex];
    const piece = greenPieces[pieceIndex];
    if (currentPos !== -1) {
        const oldCell = greenPathsCells[currentPos];
        if (oldCell.contains(piece)) {
            oldCell.removeChild(piece);
        }
    } else {
        const parent = piece.parentElement;
        if (parent) parent.removeChild(piece);
    }

    const newCell = greenPathsCells[targetIndex];

    // First check the Capture Logic :
    handleCapture(newCell, "green");
    // Then insert yours pice in Cell :
    newCell.appendChild(piece);

    // Update the position array :
    greenPositions[pieceIndex] = targetIndex;
    checkGreenWin();
}

// === Yellow Move Function with Capture Logic === //

function moveYellowPieceTo(pieceIndex, targetIndex) {
    const currentPos = yellowPositions[pieceIndex];
    const piece = yellowPieces[pieceIndex];
    if (currentPos !== -1) {
        const oldCell = yellowPathsCells[currentPos];
        if (oldCell.contains(piece)) {
            oldCell.removeChild(piece);
        }
    } else {
        const parent = piece.parentElement;
        if (parent) parent.removeChild(piece);
    }

    const newCell = yellowPathsCells[targetIndex];

    // First check the Capture Logic :
    handleCapture(newCell, "yellow");
    // Then insert yours pice in Cell :
    newCell.appendChild(piece);

    // Update the position array :
    yellowPositions[pieceIndex] = targetIndex;
    checkYellowWin();
}

// ==============Click Hnadlers ================
redPieces.forEach((piece, index) => {
    piece.addEventListener("click",() => { handleRedpieceClick(index);
    });
});


bluePieces.forEach((piece, index) => {
    piece.addEventListener("click", () => { handleBluePieceClick(index);
    });
});


greenPieces.forEach((piece, index) => {
    piece.addEventListener("click", () => { handleGreenPieceClick(index);
    });
});


yellowPieces.forEach((piece, index) => {
    piece.addEventListener("click", () => { handleYellowPieceClick(index);
    });
});

function handleRedpieceClick(pieceIndex) {
    if (players[currentPlayerIndex] !== "red") return; // Only allow red pieces to be moved on red's turn
    if (!lastDiceValue) return;

    const currentPos = redPositions[pieceIndex];

    // Simple logic to move the piece forward by the dice value if its get the 6 from Dice
    if (currentPos === -1 ) {
        if (lastDiceValue !== 6) return;
    // if target cell is 0 then the opponent is blockade at entry block :
    if (isBlockadeCell(redPathCells[0], "red")) return;


        moveRedpieceTo(pieceIndex, 0);
    } else {
        const newPos = currentPos + lastDiceValue;
        if (newPos >= redPathCells.length) {
            lastDiceValue = null; // Reset the dice value after the move
            return;
        }

        if (isPathBlockedByOpponent(redPathCells, currentPos, newPos, "red")) return;

        moveRedpieceTo(pieceIndex, newPos);
    }

    lastDiceValue = null;
    if (sixCount > 0) {
        // If the player rolled a 6, they get another turn, so we don't call nextTurn()
        sixCount = 0;
    } else {
        nextTurn();
    }
}


function handleBluePieceClick(pieceIndex) {
    if (players[currentPlayerIndex] !== "blue") return; // Only allow blue pieces to be moved on blue's turn
    if (!lastDiceValue) return;

    const currentPos = bluePositions[pieceIndex];

    if (currentPos === -1) {
        if(lastDiceValue !== 6) return;

        if (isBlockadeCell(bluePathsCells[0], "blue")) return;


        moveBluePieceTo(pieceIndex, 0);
    } else {
        const newPos = currentPos + lastDiceValue;
        if (newPos >= bluePathsCells.length) {
            lastDiceValue = null;
            return;
        }
        if (isPathBlockedByOpponent(bluePathsCells, currentPos, newPos, "blue")) return;
        moveBluePieceTo(pieceIndex, newPos);
    }

    lastDiceValue = null;
     if (sixCount > 0) {
        // If the player rolled a 6, they get another turn, so we don't call nextTurn()
        sixCount = 0;
    } else {
        nextTurn();

    }

}

function handleGreenPieceClick(pieceIndex) {
    if (players[currentPlayerIndex] !== "green") return; // Only allow green
    if (!lastDiceValue) return;

    const currentPos = greenPositions[pieceIndex];
    if (currentPos === -1) {
        if(lastDiceValue !== 6) return;
        if (isBlockadeCell(greenPathsCells[0], "green")) return;

        moveGreenPieceTo(pieceIndex, 0);
    } else {
        const newPos = currentPos + lastDiceValue;
        if (newPos >= greenPathsCells.length) {
            lastDiceValue = null;
            return;
        }
        if (isPathBlockedByOpponent(greenPathsCells, currentPos, newPos, "green")) return;
        moveGreenPieceTo(pieceIndex, newPos);
    }
    lastDiceValue = null;
     if (sixCount > 0) {
        // If the player rolled a 6, they get another turn, so we don't call nextTurn()
        sixCount = 0;
    } else {
        nextTurn();

    }

}


function handleYellowPieceClick(pieceIndex) {
    if (players[currentPlayerIndex] !== "yellow") return; // Only allow yellow pieces to be moved on yellow'
    if (!lastDiceValue) return;

    const currentPos = yellowPositions[pieceIndex];
    if (currentPos === -1) {
        if(lastDiceValue !== 6) return;
        if (isBlockadeCell(yellowPathsCells[0], "yellow")) return;

        moveYellowPieceTo(pieceIndex, 0);
    } else {
        const newPos = currentPos + lastDiceValue;
        if (newPos >= yellowPathsCells.length) {
            lastDiceValue = null;
            return;
        }
        if (isPathBlockedByOpponent(yellowPathsCells, currentPos, newPos, "yellow")) return;
        moveYellowPieceTo(pieceIndex, newPos);
    }
    lastDiceValue = null;
    if (sixCount > 0) sixCount = 0;
    else nextTurn();

}

