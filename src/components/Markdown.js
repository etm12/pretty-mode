// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';
import Remarkable from 'remarkable';

const md = new Remarkable();

/**
 * @param {App.Component.Markdown.Props} param0
 */
export default function Markdown ({ children }) {
  return (
    <React.Fragment>
      {U.thru(
        children,
        // @ts-ignore
        U.mapValue(x =>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: md.render(x) }}
          />),
      )}
    </React.Fragment>
  );
}
