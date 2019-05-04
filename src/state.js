import * as U from 'karet.util';
import Stored from 'atom.storage';

export const mkState = (initial = {}) => U.atom(initial);

export default mkState;

//

export const mkStoredState = (initial = {}, options = {}) => Stored({
  key: 'pretty-mode:v1',
  value: initial,
  Atom: U.atom,
  storage: localStorage,
})

export const initialState = {
  flags: {
    ghost: false,
  },
  items: [
    {
      geometry: {
        width: 200,
        height: 300,
        x: 200,
        y: 300,
      },
      flags: {},
      content: 'haha lol',
    },
  ],
};
