import * as K from 'kefir';
import * as U from 'karet.util';

export const not = x => !x;

export const observeEvent = (type, source) => U.thru(
  source,
  U.flatMapLatest(el => K.fromEvents(el, type).toProperty()),
);
