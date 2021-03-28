import React from 'react';
import Square from '../square/Square';
import calculateWinner from '../../util/util';

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

export default Board;