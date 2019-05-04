// @ts-check
import * as React from 'karet';
// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { mkStoredState, initialState } from './state';

const state = mkStoredState(initialState);

// TODO: Remove me
if (process.env.NODE_ENV !== 'production') {
  Object.assign(window, {
    U,
    L,
    K,
    __APP: {
      state,
    },
  });
}

ReactDOM.render(
  <App
    state={state}
  />,
  document.getElementById('root'),
);

serviceWorker.unregister();
