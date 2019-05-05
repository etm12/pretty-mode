import * as React from 'karet';
import * as U from 'karet.util';

import S from './Icon.module.scss';

const Icon = ({ children, size }) =>
  <i className={U.cns(
    'material-icons',
    'icon',
    U.when(size, U.string`icon--${size}`),
  )}>
    {children}
  </i>;

export default Icon;
