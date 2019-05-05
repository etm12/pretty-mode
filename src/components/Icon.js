import * as React from 'karet';
import * as U from 'karet.util';

/**
 * @param {App.Component.Icon.Props} props
 */
const Icon = ({ children, size }) =>
  <i className={U.cns(
    'material-icons',
    'icon',
    U.when(size, U.string`icon--${size}`),
  )}>
    {children}
  </i>;

export default Icon;
