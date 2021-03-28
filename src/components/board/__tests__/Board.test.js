import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';

import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'

it("render", () =>{
    const squares= Array(9).fill(null);

    const div = document.createElement("div");
    ReactDOM.render(<Board squares={squares}/>,div);
});

it("snapshot some movement", () =>{
    const squares= Array(9).fill(null);
    squares[0] = 'X';
    squares[1] = 'O';
    squares[2] = 'X';

    const tree = renderer.create(<Board squares={squares}/>).toJSON();
    expect(tree).toMatchSnapshot(); 
});