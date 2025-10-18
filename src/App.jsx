import { useState } from "react";
import "./App.css";

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turnOf, setTurnOf] = useState("X");

    const initializeGame = () => {
        setBoard(Array(9).fill(null));
    };

    const resetGame = () => {
        initializeGame();
        setTurnOf("X");
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
            </div>
        </>
    );
}

export default App;
