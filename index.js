function Gameboard() {
    let board = new Array(9);

    const resetBoard = () => {
        board.fill(-1);
    }

    const printBoard = () => {
        // DOM board

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
        })
    }

    const checkGameStatus = () => {
        // Checks if there is a winner or tie (1 - winned, 2 - tie)

        let isWinned = 0;

        // Horizontal winner check
        for (let i = 0; i < 9; i += 3) { 
            if (board[i] != -1 && (board[i] === board[i + 1] && board[i + 1] === board[i + 2])) {
                isWinned = 1;
                break;
            }
        }

        // Vertical winner check
        if (!isWinned) {
            for (let i = 0; i < 3; i++) {
                if (board[i] != -1 && (board[i] === board[i + 3] && board[i + 3] === board[i + 6])) {
                    isWinned = 1;
                    break;
                }
            }
        }

        // Diagonal winner check
        if (!isWinned) {
            const diagonal1 = (board[0] != -1 && (board[0] === board[4] && board[4] === board[8]));
            const diagonal2 = (board[2] != -1 && (board[2] === board[4] && board[4] === board[6]));
            if (diagonal1 || diagonal2) {
                isWinned = 1;
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

        return 2;
    }

    const changeCell = (side, cell) => {
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

    return {
        name,
        getSide,
        changeSide,
        getScore,
        increaseScore,
    };
}


const game = (function () {
    const board = Gameboard();

    const player = Player("Gigglebus", 1);
    const bot = Player();

    let activePlayer;
    let isGameOver = false;
    const playerScore = document.querySelector("#player-score");
    const botScore = document.querySelector("#bot-score");

    const botLogic = () => {
        do {
            let = botChoice = Math.floor(Math.random() * 9);
        } while (board.changeCell(0, botChoice) != 0);
    }

    const announceWinner = () => {
        if (activePlayer == 1) {
            player.increaseScore();
            playerScore.textContent = `Player: ${player.getScore()}`;
        }
        else {
            bot.increaseScore();
            botScore.textContent = `Bot: ${bot.getScore()}`;
        }
    }

    const newRoundBtn = () => {
        const newRoundDOM = document.querySelector("#new-round");
        newRoundDOM.addEventListener("click", () => {
            startRound();
        });
    }

    const startGame = () => {
        isGameOver = false;
        board.resetBoard();
        board.printBoard();
        newRoundBtn();
        

        startRound();
    }

    const startRound = () => {
        isGameOver = false;
        board.resetBoard();
        board.updateBoard();
        
        const cells = document.querySelectorAll(".cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", (event) => {
                if (!isGameOver && board.changeCell(1, event.target.dataset.id) == 0) {
                    activePlayer = 1;

                    if (board.checkGameStatus() == 0) {
                        activePlayer = 0;
                        botLogic();

                        if (board.checkGameStatus() == 1) {
                            announceWinner();
                            isGameOver = true;
                        }
                    }
                    else if (board.checkGameStatus() == 1) {
                        announceWinner();
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

game.startGame();