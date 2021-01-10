import React from 'react';

import {
  ButtonBase,
} from '@aragon/ui';

function MaxButton({ onClick }:{ onClick: Function }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <ButtonBase onClick={onClick}>
        <span style={{ opacity: 1 }}> Max </span>
      </ButtonBase>
    </div>
  );
}

export default MaxButton;
