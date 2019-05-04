// @ts-check
import * as React from 'karet';
// eslint-disable-next-line
import * as K from 'kefir';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import mkState, { mkStoredState, initialState } from './state';

const state = mkStoredState(initialState);

console.log(state);

ReactDOM.render(
  <App
    state={state}
  />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
