import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock, AddressBlock } from '../common/index';

type TradePageHeaderProps = {
  pairBalanceESD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
};

const TradePageHeader = ({
  pairBalanceESD, pairBalanceUSDC, uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceESD);

  return (
    <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', alignItems: 'center' }}>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="GSD Price" balance={price} suffix={"HUSD"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="GSD Liquidity" balance={pairBalanceESD} suffix={"GSD"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="HUSD Liquidity" balance={pairBalanceUSDC} suffix={"HUSD"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <>
          <AddressBlock label="HecoSwap Contract" address={uniswapPair} />
        </>
      </div>
    </div>
  );
}


export default TradePageHeader;
