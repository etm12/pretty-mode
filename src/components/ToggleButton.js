/**
 * @module ToggleButton
 * @namespace App.Components
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

const ToggleButton = ({ value, title, children }) =>
  <button
    title={title}
    className={U.cns(
      'button',
      U.when(value, 'button--toggled'),
    )}
    onClick={U.doModify(value, R.not)}
  >
    {children}
  </button>;

export default ToggleButton;
