function Gameboard() {
    let board = new Array(9);

    const resetBoard = () => {
        board.fill(-1);
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.classList.remove("win");
            cell.classList.remove("lose");
            cell.classList.remove("tie");
        });
    }

    const printBoard = () => {
        // Adds div elements that represent gameboard to DOM

        const domBoard = document.querySelector(".game");
        domBoard.replaceChildren();

        for (let i = 0; i < 9; i++) { 
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.id = i;
            if (board[i] == 0) {
                cell.textContent = "O";
            }
            else if (board[i] == 1){
                cell.textContent = "X";
            }

            domBoard.appendChild(cell);
        }
    }

    const updateBoard = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            if (board[cell.dataset.id] == 1) {
                cell.textContent = "X";
            }
            else if (board[cell.dataset.id] == 0) {
                cell.textContent = "O";
            }
            else {
                cell.textContent = "";
            }
        });
    }

    const changeCellColor = (playerSide, cell) => {
        // Changes cells color in case of win/lose

        if (playerSide == 1 && board[cell.dataset.id] == 1) {
            cell.classList.add("win");
        }
        else if (playerSide == 0 && board[cell.dataset.id] == 0) {
            cell.classList.add("win");
        }
        else {
            cell.classList.add("lose")
        }
    }

    const checkGameStatus = (playerSide) => {
        // Checks if there is a winner or tie (1 - winned, 2 - tie)

        let isWinned = 0;
        const cells = document.querySelectorAll(".cell");

        // Horizontal winner check
        for (let i = 0; i < 9; i += 3) { 
            if (board[i] != -1 && (board[i] === board[i + 1] && board[i + 1] === board[i + 2])) {
                isWinned = 1;
                cells.forEach((cell) => {
                    if (cell.dataset.id == i || cell.dataset.id == i + 1 || cell.dataset.id == i + 2) {
                        changeCellColor(playerSide, cell);
                    } 
                });
                break;
            }
        }

        // Vertical winner check
        if (!isWinned) {
            for (let i = 0; i < 3; i++) {
                if (board[i] != -1 && (board[i] === board[i + 3] && board[i + 3] === board[i + 6])) {
                    isWinned = 1;
                    cells.forEach((cell) => {
                        if (cell.dataset.id == i || cell.dataset.id == i + 3 || cell.dataset.id == i + 6) {
                            changeCellColor(playerSide, cell);
                        } 
                    });
                    break;
                }
            }
        }

        // Diagonal winner check
        if (!isWinned) {
            const diagonal1 = (board[0] != -1 && (board[0] === board[4] && board[4] === board[8]));
            const diagonal2 = (board[2] != -1 && (board[2] === board[4] && board[4] === board[6]));
            if (diagonal1) {
                isWinned = 1;
                cells.forEach((cell) => {
                    if (cell.dataset.id == 0 || cell.dataset.id == 4 || cell.dataset.id == 8) {
                        changeCellColor(playerSide, cell);
                    } 
                });
            }
            else if (diagonal2) {
                isWinned = 1;
                cells.forEach((cell) => {
                    if (cell.dataset.id == 2 || cell.dataset.id == 4 || cell.dataset.id == 6) {
                        changeCellColor(playerSide, cell);
                    } 
                });
            }
        }

        if (isWinned) {
            return isWinned;
        }

        // Tie check

        for (cell of board) {
            if (cell == -1) {
                return 0;
            }
        }

        cells.forEach((cell) => {
            cell.classList.add("tie");
        });

        return 2;
    }

    const changeCell = (side, cell) => {
        // Changes cell's value to x or O if possible
        if ((cell >= 0 && cell <= 8) && (side == 0 || side == 1)) {
            if (board[cell] == -1) {
                board[cell] = side;
                return 0;
            }
            return -1;
        }
        else {
            return -1;
        }
    }

    return {
        resetBoard,
        printBoard,
        checkGameStatus,
        changeCell,
        updateBoard,
    };
}


function Player(name = "Bot", side = 0) {
    let score = 0;

    const getSide = () => side;
    const changeSide = () => {
        if (side === 0) {
            side = 1;
        }
        else {
            side = 0;
        }
    }

    const getScore = () => score;
    const increaseScore = () => {score++};
    const getName = () => name;
    const changeName = (newName) => {
        name = newName;
    }

    return {
        getName,
        changeName,
        getSide,
        changeSide,
        getScore,
        increaseScore,
    };
}


const game = (function () {
    const board = Gameboard();

    const player = Player("Player", 1);
    const bot = Player();

    let tieScoreCount;
    let activePlayer;
    let isGameOver = false;
    const playerScore = document.querySelector("#player-score");
    const botScore = document.querySelector("#bot-score");
    const tieScore = document.querySelector("#tie-score");

    const capitalize = (string) => {
        return string.at(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const botLogic = () => {
        do {
            let = botChoice = Math.floor(Math.random() * 9);
        } while (board.changeCell(bot.getSide(), botChoice) != 0);
    }

    const announceWinner = () => {
        if (activePlayer == 1) {
            player.increaseScore();
            playerScore.textContent = `${player.getName()}: ${player.getScore()}`;
        }
        else {
            bot.increaseScore();
            botScore.textContent = `${bot.getName()}: ${bot.getScore()}`;
        }
    }

    const newRound = () => {
        // New round button
        const newRoundBtn = document.querySelector("#new-round");
        newRoundBtn.addEventListener("click", () => {
            startRound();
        });
    }

    const changeName = () => {
        // Opens dialog form for changing player's name 
        const cancelBtn = document.querySelector('button[value="cancel"]');

        const dialog = document.querySelector("#change-name-dialog");
        const form = dialog.querySelector("form");
        const changeNameBtn = document.querySelector("#change-name");

        changeNameBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        form.addEventListener("submit", () => {
            player.changeName(`${capitalize(form.elements.userName.value)}`);
            playerScore.textContent = `${player.getName()}: ${player.getScore()}`;
        });

        dialog.addEventListener("close", () => {
            form.reset();
        });

        cancelBtn.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.close();
        });
    }

    const changeSide = () => {
        const changeSideBtn = document.querySelector("#change-side");

        changeSideBtn.addEventListener("click", (event) => {
            player.changeSide();
            bot.changeSide();

            startRound();
        });
    }

    const startGame = () => {
        isGameOver = false;
        tieScoreCount = 0;
        board.resetBoard();
        board.printBoard();
        newRound();
        changeName();
        changeSide();
        playerScore.textContent = `${player.getName()}: ${player.getScore()}`;
        botScore.textContent = `${bot.getName()}: ${bot.getScore()}`;
        tieScore.textContent = `Tie: ${tieScoreCount}`
        

        startRound();
    }

    const startRound = () => {
        isGameOver = false;
        board.resetBoard();
        board.updateBoard();

        // Bot gets 1st turn if he's side is X
        if (bot.getSide() == 1) {
            botLogic();
            board.updateBoard();
        }
        
        const cells = document.querySelectorAll(".cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", (event) => {
                // Player turn
                if (!isGameOver && board.changeCell(player.getSide(), event.target.dataset.id) == 0) {
                    activePlayer = 1;

                    if (board.checkGameStatus(player.getSide()) == 0) {
                        // Bot turn
                        activePlayer = 0;
                        botLogic();

                        if (board.checkGameStatus(player.getSide()) == 1) {
                            // Bot win
                            announceWinner();
                            isGameOver = true;
                        }
                        else if (board.checkGameStatus(player.getSide()) == 2) {
                            // Tie
                            tieScoreCount++;
                            tieScore.textContent = `Tie: ${tieScoreCount}`;
                            isGameOver = true;
                        }
                    }
                    else if (board.checkGameStatus(player.getSide()) == 1) {
                        // Player win
                        announceWinner();
                        isGameOver = true;
                    }
                    else {
                        // Tie
                        tieScoreCount++;
                        tieScore.textContent = `Tie: ${tieScoreCount}`;
                        isGameOver = true;
                    }

                    board.updateBoard();
                }
            });
        });
    }

    return {
        startGame,
    }
})();

function switchingModes() {
    let lightmode = localStorage.getItem("lightmode");
    const switchBtn = document.querySelector("#mode-switch");

    const enableLightMode = () => {
        document.body.classList.add("lightmode");
        localStorage.setItem("lightmode", "active");
    }

    const disableLightMode = () => {
        document.body.classList.remove("lightmode");
        localStorage.setItem("lightmode", null);
    }

    if (lightmode === "active") {
        enableLightMode();
    }

    switchBtn.addEventListener("click", () => {
        lightmode = localStorage.getItem("lightmode");
        lightmode !== "active" ? enableLightMode() : disableLightMode();
    })

}

switchingModes();
game.startGame();