/**
 * @module App
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';

import Draggable from './components/Draggable';
import Controls from './components/Controls';
import * as M from './meta';

/**
 * @param {Props} props
 * @return {JSX.Element}
 */
export default function App ({ state }) {
  const items = U.view(['items', M.ArrayDraggableL], state);
  const flags = U.view('flags', state);
  state.log('state');

  return (
    <div
      className={U.cns(
        'app',
        U.when(U.view('ghost', flags), 'app--ghost-mode')
      )}
    >
      <Controls
        items={items}
        flags={flags}
      />

      {U.thru(
        U.view(['items', L.array(M.DraggableL)], state),
        U.mapElems((it, i) =>
          <Draggable
            key={i}
            geometry={M.geometryIn(it)}
            flags={M.flagsIn(it)}
            content={M.contentIn(it)}
            style={M.styleIn(it)}
          />)
      )}
    </div>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any} state
 */
