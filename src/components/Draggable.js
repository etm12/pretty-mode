import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import { xyToTranslate } from '../utils';
import { observeMouseDown, observeMouseMove, observeMouseUp } from '../global-events';
import S from './Draggable.module.scss';

// import Style from './Style';
import ToggleButton from './ToggleButton';

/**
 * @param {Props} props
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

  const mouseMoveUntilUp = U.flatMapLatest(() => U.thru(
    observeMouseMove(),
    U.takeUntilBy(
      U.takeFirst(1, observeMouseUp()),
    ),
  ));

  const onDrag = mouseMoveUntilUp(refClick);
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
        S.draggable,
        U.when(locked, 'locked'),
        U.when(moving, 'moving'),
      )}
    >
      <header
        className={U.cns(
          S.header,
        )}
      >
        <div
          className={U.cns(S.headerTitle)}
          ref={U.refTo(ref)}
        >
          Note
        </div>
      </header>

      <div
        className={U.cns(
          S.content,
          U.when(editing, S.editing),
        )}
      >
        <React.Fragment>
          {U.sink(updateDragCoords)}
        </React.Fragment>

        <div className={U.cns(
          S.contentContainer,
        )}>
          {U.unless(
            editing,
            <div
              className={S.contentDisplay}
              style={style}
            >
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
                U.set(content)
              )}
            />,
          )}
        </div>
      </div>

      <footer className={U.cns(S.footer)}>
        <aside className={U.cns(S.headerControls)}>
          <ToggleButton value={locked}>
            {U.ifElse(locked, 'Unlock', 'Lock')}
          </ToggleButton>
          <ToggleButton value={editing}>
            {U.ifElse(editing, 'Stop editing', 'Edit')}
          </ToggleButton>
          <ToggleButton value={styling}>
            {U.ifElse(styling, 'Done styling', 'Style')}
          </ToggleButton>
        </aside>
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
