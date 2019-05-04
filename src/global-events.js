// eslint-disable-next-line
import * as K from 'kefir';
import { observeEvent } from './utils';

export const observeMouse = (src = document) => ({
  down: observeEvent('mousedown', src),
  up: observeEvent('mouseup', src),
  move: observeEvent('mousemove', src),
});

/** @type {MakeObserver} */
export const observeMouseMove = (src = document) => observeEvent('mousemove', src);

/** @type {MakeObserver} */
export const observeMouseDown = (src = document) => observeEvent('mousedown', src);

/** @type {MakeObserver} */
export const observeMouseUp = (src = document) => observeEvent('mouseup', src);

/**
 * @callback MakeObserver
 * @param {HTMLElement} [src=document]
 * @return {K.Observable<Event, any>}
 */
