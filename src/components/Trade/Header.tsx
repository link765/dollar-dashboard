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
      <div style={{ flexBasis: '50%' }}>
        <BalanceBlock asset="GSD 价格" balance={price} suffix={"HUSD"}/>
      </div>
      <div style={{ flexBasis: '50%' }}>
        <BalanceBlock asset="流动性池GSD数量" balance={pairBalanceESD} suffix={"GSD"}/>
      </div>
      <div style={{ flexBasis: '50%' }}>
        <BalanceBlock asset="流动性池HUSD数量" balance={pairBalanceUSDC} suffix={"HUSD"}/>
      </div>
      <div style={{ flexBasis: '50%' }}>
        <>
          <AddressBlock label="HecoSwap交易对合约" address={uniswapPair} />
        </>
      </div>
    </div>
  );
}


export default TradePageHeader;
