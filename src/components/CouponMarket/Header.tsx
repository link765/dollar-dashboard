import React from 'react';

import BigNumber from "bignumber.js";
import { BalanceBlock } from "../common";
import {ownership} from "../../utils/number";

type CouponMarketHeaderProps = {
  debt: BigNumber,
  supply: BigNumber,
  coupons: BigNumber,
  premium: BigNumber,
  redeemable: BigNumber,
};

const CouponMarketHeader = ({
  debt, supply, coupons, premium, redeemable
}: CouponMarketHeaderProps) => (
  <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', alignItems: 'center' }}>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="债务比例" balance={ownership(debt, supply)} suffix={"%"}/>
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="总债务" balance={debt} suffix={"GSD"}/>
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="优惠券" balance={coupons} />
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="回报率" balance={premium.multipliedBy(100)} suffix={"%"}/>
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="可兑现优惠券" balance={redeemable}/>
    </div>
  </div>
);


export default CouponMarketHeader;
