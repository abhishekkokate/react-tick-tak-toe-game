import { useEffect, useState } from "react";
import "./App.css";
import IconClose from "./assets/icons/close.svg";

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winningCombinations, setWinningCombinations] = useState([[0, 1, 2]]);
    const [turnOf, setTurnOf] = useState("X");
    const [gameWinner, setGameWinner] = useState(false);

    const initializeGame = () => {
        setBoard(Array(9).fill(null));
    };

    const resetGame = () => {
        initializeGame();
        setTurnOf("X");
    };

    const calcGameOutput = () => {
        for (let combination of winningCombinations) {
            if (board[combination[0]] && board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]]) {
                setGameWinner(board[combination[0]]);
            }
        }
    };

    const setMove = (index) => {
        if (board[index]) {
            return;
        }

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[index] = turnOf;
            return newBoard;
        });
        setTurnOf(turnOf === "X" ? "O" : "X");
    };

    useEffect(() => {
        calcGameOutput();
    }, [board]);

    return (
        <>
            <div className="app-container">
                <div className="game-title">
                    <h1>Tik-Tak-Toe</h1>
                </div>
                <div className="game-container">
                    <div className="game-actions">
                        <h2 className="turn-indicator">
                            Player <span className={turnOf === "X" ? "player-X" : "player-O"}>{turnOf}</span>'s Turn
                        </h2>
                        <button
                            onClick={() => {
                                resetGame();
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="game-content">
                        {board.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className={"game-card" + " " + (item === "X" ? "player-X" : "player-O")}
                                    onClick={() => {
                                        setMove(index);
                                    }}
                                    disabled={item !== null}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div className="game-scores"></div>
                </div>
                {gameWinner && (
                    <div className="game-end-container">
                        {/* <span
                            className="game-end-close"
                            onClick={() => {
                                setGameWinner(false);
                            }}
                        >
                            <img src={IconClose} alt="close" />
                        </span> */}
                        <div className="game-end-title">
                            <h2>Game Over!</h2>
                        </div>
                        <div className="game-end-output">
                            {["X", "O"].includes(gameWinner) ? (
                                <h2 className={gameWinner === "X" ? "player-X" : "player-O"}>Player {gameWinner} Wins</h2>
                            ) : (
                                <h2 className="player-none">Its a Draw!</h2>
                            )}
                        </div>
                        <div className="game-end-actions">
                            <button
                                className="game-end-restart"
                                onClick={() => {
                                    resetGame();
                                    setGameWinner(false);
                                }}
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
