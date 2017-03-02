import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './container/index';

const rootEl = document.getElementById('root');

const render = (Component) => {
	ReactDOM.render(
    	<AppContainer>
      		<Component/>
    	</AppContainer>,
    	rootEl
  	);
};

render(App);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./container/index', () => {
		const NextApp = require('./container/index').default;
    	render(NextApp)
  	});
}