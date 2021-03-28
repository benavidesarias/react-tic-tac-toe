import React from 'react';
import Board from '../board/Board'
import calculateWinner from '../../util/util';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null,
                xIsNext: true
            }],
            stepNumber: 0,
            xIsFirst: true
        };
    }

    newGame() {

        this.setState({
            history: [{
                squares: Array(9).fill(null),
                position: null,
                xIsNext: !this.state.xIsFirst
            }],
            stepNumber: 0,
            xIsFirst: !this.state.xIsFirst
        });
    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i])
            return;

        squares[i] = current.xIsNext ? 'X' : 'O';

        //position
        const row = Math.floor(i / 3) + 1;
        const col = i % 3 + 1;
        const position = `(row:${row}, col:${col})`;

        this.setState({
            history: history.concat([{
                squares: squares,
                position: position,
                xIsNext: !current.xIsNext
            }]),
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        //status
        const winner = calculateWinner(current.squares);
        let status;
        if (winner.winner) {
            status = `Winner: ${winner.winner}`;
        }
        else if (this.state.stepNumber === 9) {
            status = 'Draw';
        }
        else {
            const nextPlayer = current.xIsNext ? 'X' : 'O';
            status = `Next player: ${nextPlayer}`;
        }

        //list of moves
        const moves = history.map(
            (step, move) => {

                const desc = move ? `Go to move # ${move} ${step.position}` : 'Go to game start';
                const active = move === this.state.stepNumber;

                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}
                            className={active ? "active" : ""}
                        >
                            {desc}
                        </button>
                    </li>
                );
            }
        );

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.newGame()}>New Game</button></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;