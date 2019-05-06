import * as U from 'karet.util';
import Stored from 'atom.storage';

export const mkState = (initial = {}) => U.atom(initial);

export default mkState;

//

export const mkStoredState = (initial = {}, options = {}) => Stored({
  key: 'pretty-mode:v2',
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
      content: 'Large text',
      style: {
        fontSize: 32,
      }
    },
    {
      geometry: {
        width: 250,
        height: 250,
        x: 100,
        y: 100,
      },
      flags: {},
      content: 'Regular text',
      style: {},
    },
    {
      geometry: {
        width: 250,
        height: 250,
        x: 300,
        y: 150,
      },
      flags: {},
      content: '### Some markdown\n\n * List item\n * Another one',
      style: {},
    },
  ],
};
