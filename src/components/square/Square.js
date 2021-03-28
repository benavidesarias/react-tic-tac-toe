import React from 'react';

function Square(props) {
    return (
        <button
            data-testid = 'square'
            className={props.className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;