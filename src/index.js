import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], row: lines[i] };
        }
    }

    return { winner: null, row: null };
}


function Square(props) {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i, className) {

        return (
            <Square
                key={i}
                className={className}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        const rows = [];
        let squareIndex = 0;

        const winner = calculateWinner(this.props.squares);

        // 3x3 Squares 
        for (let row = 0; row < 3; row++) {
            const children = [];
            for (let col = 0; col < 3; col++) {

                if (winner.winner && (squareIndex === winner.row[0] || squareIndex === winner.row[1] || squareIndex === winner.row[2]))
                    children.push(this.renderSquare(squareIndex, "winner-square"));
                else
                    children.push(this.renderSquare(squareIndex, "square"));

                squareIndex++;
            }
            rows.push(<div className="board-row" key={row}>{children}</div>);
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null,
                xIsNext: true
            }],
            stepNumber: 0
        };
    }

    newGame() {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        this.setState({
            history: [{
                squares: Array(9).fill(null),
                position: null,
                xIsNext: !current.xIsNext
            }],
            stepNumber: 0
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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);