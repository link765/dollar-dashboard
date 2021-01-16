import React from 'react';

import BigNumber from 'bignumber.js';
import {formatBN} from "../../utils/number";

type BlanceBlockProps = {
  asset: string,
  balance: BigNumber | string | number
  suffix?: string
}

function BalanceBlock({ asset, balance, suffix=""}: BlanceBlockProps) {
  let integer = '0';
  let digits = '0';
  const balanceBN = new BigNumber(balance);
  if (balanceBN.gte(new BigNumber(0))) {
    const tokens = formatBN(balanceBN, 2).split('.')
    integer = tokens[0];
    digits = tokens[1];
  }

  return (
    <>
      <div style={{ fontSize: '0.5rem', padding: 3, fontWeight: 'bold' }}>{asset}</div>
      <div style={{ padding: 3, fontWeight: 'bold'  }}>
        <span style={{ fontSize: '0.5rem' }}>{integer}</span>
        .
        <span style={{ fontSize: '0.5rem' }}>
          {' '}
          {digits}
          {' '}
        </span>
        {suffix === "" ? '' : <span style={{ fontSize: '0.5rem' }}>{suffix}</span> }
      </div>
    </>
  );
}

export default BalanceBlock;
