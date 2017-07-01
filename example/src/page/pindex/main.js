/** @jsx h */
import Preact, { h, Component } from 'preact';

import Main from './container/index';

const rootEl = document.getElementById('root');

const render = (Component) => {
    ReactDOM.render(
        <Component/>,
        rootEl
    );
};

render(Main);