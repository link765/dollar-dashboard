import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";

type AccountPageHeaderProps = {
  accountESDBalance: BigNumber,
  accountESDSBalance: BigNumber,
  totalESDSSupply: BigNumber,
  accountStagedBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountStatus: number,
  unlocked: number,
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus, unlocked) {
  return STATUS_MAP[accountStatus] + (accountStatus === 0 ? "" : " 直至第 " + unlocked +'周期')
}

const AccountPageHeader = ({
  accountESDBalance, accountESDSBalance, totalESDSSupply, accountStagedBalance, accountBondedBalance, accountStatus, unlocked
}: AccountPageHeaderProps) => (
  <div style={{ padding: '0 2%', display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', alignItems: 'center' }}>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="账户余额" balance={accountESDBalance} suffix={" GSD"}/>
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="Staged阶段代币" balance={accountStagedBalance}  suffix={" GSD"}/>
    </div>
    <div style={{ flexBasis: '33%' }}>
      <BalanceBlock asset="Bonded阶段代币" balance={accountBondedBalance} suffix={" GSD"} />
    </div>
    <div style={{ flexBasis: '50%' }}>
      <BalanceBlock asset="你的DAO占比" balance={ownership(accountESDSBalance, totalESDSSupply)}  suffix={"%"}/>
    </div>
    <div style={{ flexBasis: '50%' }}>
      <TextBlock label="状态" text={status(accountStatus, unlocked)}/>
    </div>
  </div>
);


export default AccountPageHeader;
