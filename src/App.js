import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

const not = x => !x;

const observeEvent = (type, source) => U.thru(
  source,
  U.flatMapLatest(el => K.fromEvents(el, type).toProperty()),
);

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

function App() {
  const doc = K.constant(window);
  const ref = U.variable();
  const { style } = U.destructure(state);
  
  const drag = observeEvent('mousemove', ref);

  const refClick = observeEvent('mousedown', ref).toProperty();

  const takeProps = ps => obs => U.thru(
    obs,
    U.view(L.props(...ps)),
    U.toProperty,
    U.mapValue(R.values),
  );

  const a = takeProps(['pageX', 'pageY'])(refClick);
  const b = takeProps(['offsetX', 'offsetY'])(refClick);
  const c = U.combine([a, b], R.pipe(R.zip, R.map(R.apply(R.subtract))));
  
  return (
    <div className="App">
      <div
        className="draggableOrigo"
        style={{
          width: 10,
          height: 10,
          border: 'solid 2px #00f',
          position: 'absolute',
          left: U.view(0, c),
          top: U.view(1, c),
        }}
      />
      <div
        className="cursor"
        style={{
          backgroundColor: '#f00',
          width: 10,
          height: 10,
          position: 'absolute',
          left: U.view(0, a),
          top: U.view(1, a),
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
            left: U.view(0, b),
            top: U.view(1, b),
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
