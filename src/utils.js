import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

export const not = x => !x;

export const observeEvent = (type, source) => U.thru(
  source,
  U.flatMapLatest(el => K.fromEvents(el, type).toProperty()),
);

export const toProperty = obs => obs instanceof K.Observable
  ? obs.toProperty()
  : K.constant(obs);

export const takeProps = ps => obs => U.thru(
  obs,
  U.view(L.props(...ps)),
  U.toProperty,
  U.mapValue(R.values),
);

export const xyToTranslate = (x, y) => U.string`translateX(${x}px) translateY(${y}px)`;
