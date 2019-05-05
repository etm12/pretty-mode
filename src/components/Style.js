import * as React from 'karet';
import * as U from 'karet.util';

const Style = () => {
  return (
    <div className="style">
      <header>
        Style
      </header>

      <div>
        <section>
          <header>
            Text
          </header>
          <dl className="style-controls">
            <dt>Font size</dt>
            <dd>16</dd>
          </dl>
        </section>

        <fieldset>
          <legend>Background</legend>

          <dl className="style-controls">
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
