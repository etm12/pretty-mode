import * as React from 'karet';
import * as U from 'karet.util';

import S from './Controls.module.css';

const Controls = ({ items }) => {
  return (
    <div className={U.cns(
      S.controls,
    )}>
      <div className={U.cns(
        S.controlGroup,
      )}>
        <button>
          Add new
        </button>
        <button>
          Ghost
        </button>
      </div>
    </div>
  );
};

export default Controls;
