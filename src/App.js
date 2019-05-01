import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import { not, observeEvent } from './utils';

const state = U.atom({
  style: {
    width: 200,
    height: 300,
    left: 200,
    top: 300,
  },
  locked: true,
  moving: true,
})

//

function App({ docEvents }) {
  const doc = K.constant(window);
  const ref = U.variable();
  const { style } = U.destructure(state);

  const drag = observeEvent('mousemove', ref);

  const refClick = observeEvent('mousedown', ref).toProperty();
  const refClickEnd = observeEvent('mouseup', ref).toProperty();

  const takeProps = ps => obs => U.thru(
    obs,
    U.view(L.props(...ps)),
    U.toProperty,
    U.mapValue(R.values),
  );

  // Coordinates where clicked on the page
  const refClickPXY = takeProps(['pageX', 'pageY'])(refClick);

  // Coordinates where clicked on the ref
  const refClickRXY = takeProps(['offsetX', 'offsetY'])(refClick);

  // Coordinates of ref's upper left corner
  const refOrigo = U.combine([refClickPXY, refClickRXY], R.pipe(R.zip, R.map(R.apply(R.subtract))));

  const dragg = U.thru(
    refClick,
    U.flatMapLatest(() => U.thru(
      docEvents.move,
      U.takeUntilBy(
        U.takeFirst(
          1,
          observeEvent('mouseup', document).toProperty(),
        )
      )
    )),
  ).log('dragg');

  return (
    <div className="App">
      <div
        className="draggableIndicator"
        style={{
          width: 10,
          height: 10,
        }}
      />

      <div
        className="draggableOrigo"
        style={{
          width: 10,
          height: 10,
          border: 'solid 2px #00f',
          position: 'absolute',
          left: U.view(0, refOrigo),
          top: U.view(1, refOrigo),
        }}
      />
      <div
        className="cursor"
        style={{
          backgroundColor: '#f00',
          width: 10,
          height: 10,
          position: 'absolute',
          left: U.view(0, refClickPXY),
          top: U.view(1, refClickPXY),
        }}
      />
      <div
        ref={U.refTo(ref)}
        className={U.cns(
          'draggable',
        )}
        style={style}
      >
        <div
          className="cursorRelative"
          style={{
            width: 20,
            height: 20,
            marginLeft: -5,
            marginTop: -5,
            position: 'absolute',
            border: 'dashed 2px #f0f',
            left: U.view(0, refClickRXY),
            top: U.view(1, refClickRXY),
          }}
        />
        <div className="draggable__body">
          move me
        </div>
      </div>
    </div>
  );
}

export default App;
