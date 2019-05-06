import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import { observeMouseDown, observeMouseUp, observeMouseMove } from '../global-events';
import { pageCoordsFrom, takeUniqueWith } from '../utils';

const resizeDirections = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

/**
 *
 * @param {object} param0
 * @param {IDraggableGeometry} param0.geometry
 */
const Handle = ({ direction, geometry, handler }) => {
  const ref = U.variable();
  const refClick = observeMouseDown(ref);

  const onDrag = U.flatMapLatest(() => U.thru(
    observeMouseMove(),
    U.takeUntilBy(
      U.takeFirst(1, observeMouseUp()),
    ),
  ), refClick);

  const refDragCoords = pageCoordsFrom(onDrag);

  const geometryOffset = U.mapValue(R.props(['x', 'y']), geometry);
  // eslint-disable-next-line
  const geometrySize = U.mapValue(R.props(['width', 'height']), geometry);

  const refNewSize = U.thru(
    refDragCoords,
    U.flatMapLatest(xy => U.template([K.constant(xy), geometryOffset])),
    U.mapValue(R.pipe(
      R.apply(R.zip),
      R.map(R.apply(R.subtract)),
    )),
  );

  /* eslint-disable */
  const refNewWidth = takeUniqueWith(R.head, refNewSize);
  const refNewHeight = takeUniqueWith(R.last, refNewSize);
  /* eslint-enable */

  return (
    <div
      ref={U.refTo(ref)}
      className={U.cns('resize', U.string`resize--${direction}`)}
    />
  )
}

/**
 * @param {App.Component.ResizeHandles.Props} props
 */
const ResizeHandles = ({ geometry, directions = resizeDirections }) =>
  <React.Fragment>
    {U.thru(
      directions,
      U.mapElems((d, di) =>
        <Handle key={di} direction={d} geometry={geometry} />),
    )}
  </React.Fragment>;

export default ResizeHandles;
