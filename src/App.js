import * as React from 'karet';
import * as U from 'karet.util';

import Draggable from './components/Draggable';
import Controls from './components/Controls';
import * as M from './meta';

function App ({ state }) {
  return (
    <div className="App">
      <Controls />
      {U.thru(
        U.view('items', state),
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

export default App;
