import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import S from './ToggleButton.module.scss';

const ToggleButton = ({ value, children, enabled = true }) =>
  <button
    className={U.cns(
      S.button,
      U.when(value, S.toggled),
    )}
    onClick={U.doModify(value, R.not)}
  >
    {children}
  </button>;

export default ToggleButton;
