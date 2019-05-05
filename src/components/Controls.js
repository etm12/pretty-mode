import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

/**
 * @param {Props} props
 */
export default function Controls ({ items, flags }) {
  const defaultItem = { geometry: { width: 160, height: 220 } };
  const appendNewItem = U.doSet(U.view(L.appendTo, items), defaultItem);
  const toggleGhostMode = U.doModify(U.view('ghost', flags), R.not);

  return (
    <div className="controls">
      <div className="control-group control-group--vertical">
        <button className="button" onClick={appendNewItem}>
          <i className="material-icons">create</i>
        </button>
        <button className="button" onClick={toggleGhostMode}>
          <i className="material-icons">crop_free</i>
        </button>
      </div>
    </div>
  );
}

/**
 * @typedef {object} Props
 * @prop {Array.<object>} items
 * @prop {Object.<string, boolean>} flags
 */
