function Gameboard() {
    let board = [];

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board.push(-1);
        }
    }

    const printBoard = () => {
        // Console board

        for (let i = 0; i < 9; i += 3) { 
            console.log(board[i], board[i + 1], board[i + 2]);
        }
    }

    const checkGameStatus = () => {
        // Checks if there is a winner or tie

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
            const diagonal2 = (board[0] != -1 && (board[2] === board[4] && board[4] === board[6]));
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
            if (board[cell] != -1) {
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

    let activePlayer = 1;
    let playerChoice;
    let botChoice;

    const startRound = () => {
        board.printBoard();

        while (board.checkGameStatus == 0) {
            do {
                playerChoice = prompt("Choose cell (0-8)");
            } while (playerChoice < 0 || playerChoice > 8);

            if (board.checkGameStatus != 0) {
                break;
            }


        }
    }
})();