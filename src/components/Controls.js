import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import S from './Controls.module.scss';

const Controls = ({ items, flags }) => {
  const defaultItem = { geometry: { width: 160, height: 220 } };
  const appendNewItem = U.doSet(U.view(L.appendTo, items), defaultItem);
  const toggleGhostMode = U.doModify(U.view('ghost', flags), R.not);

  return (
    <div className={U.cns(
      S.controls,
    )}>
      <div className={U.cns(
        S.controlGroup,
      )}>
        <button onClick={appendNewItem}>
          Add new
        </button>
        <button onClick={toggleGhostMode}>
          Ghost
        </button>
      </div>
    </div>
  );
};

export default Controls;
