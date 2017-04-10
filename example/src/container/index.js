import React, { Component } from 'react';
import Hello from 'index';
class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {

		return (
			<Hello></Hello>
		);
	}
}

export default Wrapper;