import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import { xyToTranslate } from '../utils';
import { observeMouseDown, observeMouseMove, observeMouseUp } from '../global-events';

import ToggleButton from './ToggleButton';
import Icon from './Icon';

/**
 * @param {import('./Draggable').IProps} props
 */
function Draggable ({ geometry, flags, content, style }) {
  const ref = U.variable();
  const refClick = observeMouseDown(ref);

  const { locked, moving, editing, styling } = U.destructure(flags);

  const position = U.view(L.props('x', 'y'), geometry);

  const _style = U.combine(
    [geometry, style],
    (g, s) => ({
      width: g.width,
      height: g.height,
      transform: xyToTranslate(g.x, g.y),
      ...s,
    })
  );

  const onDrag = U.flatMapLatest(() => U.thru(
    observeMouseMove(),
    U.takeUntilBy(
      U.takeFirst(1, observeMouseUp()),
    ),
  ), refClick);

  const dragPageCoords = U.mapValue(R.props(['pageX', 'pageY']), onDrag);

  const updateDragCoords = U.thru(
    dragPageCoords,
    U.mapValue(R.zipObj(['x', 'y'])),
    U.consume(xy => position.set(xy)),
  );

  return (
    <article
      style={_style}
      className={U.cns(
        'draggable',
        U.when(locked, 'locked'),
        U.when(moving, 'moving'),
      )}
    >
      {U.sink(updateDragCoords)}
      <header
        className={U.cns('draggable-header')}
      >
        <div
          className={U.cns('draggable-header__title')}
          ref={U.refTo(ref)}
        >
          Item
        </div>

        <aside className="draggable-controls">
          <div className="draggable-controls__button-group">
            <ToggleButton
              value={locked}
              title={U.ifElse(locked, 'Unlock', 'Lock')}
            >
              <Icon size="small">lock</Icon>
            </ToggleButton>

            <ToggleButton
              value={editing}
              title={U.ifElse(editing, 'Stop editing', 'Edit')}
            >
              <Icon size="small">edit</Icon>
            </ToggleButton>

            <ToggleButton
              value={styling}
              title={U.ifElse(styling, 'Done styling', 'Style')}
            >
              <Icon size="small">palette</Icon>
            </ToggleButton>
          </div>

          <div className="draggable-controls__button-group">
            <ToggleButton>
              <Icon size="small">vertical_align_top</Icon>
            </ToggleButton>

            <ToggleButton>
              <Icon size="small">vertical_align_bottom</Icon>
            </ToggleButton>
          </div>
        </aside>
      </header>

      <div className={U.cns(
        'draggable-content',
        U.when(editing, 'editing'),
      )}>
        <div className="draggable-content__container">
          {U.unless(
            editing,
            <div className="draggable-content__show-content"
                 style={style}>
              {content}
            </div>,
          )}

          {U.when(
            editing,
            <textarea
              defaultValue={content}
              style={{ fontSize: 12 }}
              onInput={U.through(
                U.view(['target', 'value', L.valueOr('lol empty')]),
                U.set(content),
              )}
            />,
          )}
        </div>
      </div>

      <footer className="draggable-footer">

      </footer>
    </article>
  );
}

export default Draggable;

//

/**
 * @typedef {object} Props
 * @prop {object} style
 * @prop {object} style.size
 * @prop {number} style.size.width
 * @prop {number} style.size.height
 * @prop {object} style.position
 * @prop {number} style.position.x
 * @prop {number} style.position.y
 * @prop {boolean} locked
 * @prop {boolean} moving
 * @prop {boolean} editing
 * @prop {boolean} styling
 * @prop {string} content
 */
