import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../Square';

import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

it("render", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Square />,div);
});

it("renden with props.value X", () => {
	const {getByTestId} = render(<Square value='X' />);
	expect(getByTestId('square')).toHaveTextContent('X');
});

it("renden with props.value O", () => {
	const {getByTestId} = render(<Square value='O' />);
	expect(getByTestId('square')).toHaveTextContent('O');
});

it("snapshot", ()=>{
	const tree = renderer.create(<Square value='X' />).toJSON();
	expect(tree).toMatchSnapshot();
});