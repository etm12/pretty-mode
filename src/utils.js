// @ts-check
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

/**
 * @template T
 * @param {T} x
 */
export const not = x => !x;

/**
 * @template T
 * @param {string} type
 * @param {K.Observable<T, any>} source
 */
export const observeEvent = (type, source) => U.thru(
  source,
  // @ts-ignore
  U.flatMapLatest(el => K.fromEvents(el, type).toProperty()),
);

/**
 * @template T
 * @param {K.Observable<T, any>} obs
 */
export const toProperty = obs => obs instanceof K.Observable
  ? obs.toProperty()
  : K.constant(obs);

// @ts-ignore
export const takeProps = ps => obs => U.thru(
  obs,
  U.view(L.props(...ps)),
  U.toProperty,
  U.mapValue(R.values),
);

/**
 * @param {number} x
 * @param {number} y
 */
export const xyToTranslate = (x, y) => U.string`translateX(${x}px) translateY(${y}px)`;

export const movementDeltaFrom = U.mapValue(R.props(['movementX', 'movementY']));

export const pageCoordsFrom = U.mapValue(R.props(['pageX', 'pageY']));

// @ts-ignore
export const takeUniqueWith = (fn, obs) => U.thru(
  obs,
  U.mapValue(fn),
  U.skipDuplicates(R.identical),
);
