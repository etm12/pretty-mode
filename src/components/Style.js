import * as React from 'karet';
import * as U from 'karet.util';

import S from './Style.module.css';

const Style = () => {
  return (
    <div
      className={U.cns(
        S.style,
      )}
    >
      <header>
        Style
      </header>

      <div>
        <section>
          <header>
            Text
          </header>
          <dl className={S.controls}>
            <dt>Font size</dt>
            <dd>16</dd>
          </dl>
        </section>

        <fieldset>
          <legend>Background</legend>

          <dl className={S.controls}>
            <dt>Color</dt>
            <dd>
              <input type="color" value="#ff0000" />
            </dd>
          </dl>
        </fieldset>
      </div>
    </div>
  );
};

export default Style;
