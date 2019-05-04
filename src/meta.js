import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';

// const orFalse = L.define(false);
// const orZero = L.define(0);
const orString = L.define('');

const propOrDefault = d => p => [p, L.define(d)];
const propOrZero = propOrDefault(0);
const propOrFalse = propOrDefault(false);
// const propOrString = propOrDefault('');

export const GeometryL = L.pick({
  width: propOrZero('width'),
  height: propOrZero('height'),
  x: propOrZero('x'),
  y: propOrZero('y'),
});

export const FlagsL = L.pick({
  locked: propOrFalse('locked'),
  moving: propOrFalse('moving'),
  editing: propOrFalse('editing'),
  styling: propOrFalse('styling'),
});

export const DraggableL = L.pick({
  geometry: ['geometry', GeometryL],
  flags: ['flags', FlagsL],
  content: ['content', orString],
});

export const ArrayDraggableL = L.array(DraggableL);

//

export const geometryIn = U.view(['geometry', GeometryL]);
export const flagsIn = U.view(['flags', FlagsL]);
export const contentIn = U.view(['content', L.define('')]);
export const styleIn = U.view('style');
