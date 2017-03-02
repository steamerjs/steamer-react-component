import React, { Component } from 'react';

class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			word: "hello world!"
		};
	}

	render() {

		return (
	        <div>{this.state.word}</div>
		);
	}
}

export default Wrapper;