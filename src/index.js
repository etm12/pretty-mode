// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';
import * as K from 'kefir';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { observeEvent } from './utils';

/**
 * @type {Object.<string, K.Property<Event, any>>}
 */
const docEvents = {
  move: observeEvent('mousemove', document),
};

ReactDOM.render(
  <App
    docEvents={docEvents}
  />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
