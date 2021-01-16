import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus, IconLock
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {approve, depositPool, withdrawPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {UNI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";

type WithdrawDepositProps = {
  poolAddress: string
  user: string
  balance: BigNumber,
  allowance: BigNumber,
  stagedBalance: BigNumber,
  status: number
};

function WithdrawDeposit({
  poolAddress, user, balance, allowance, stagedBalance, status
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <div className="block-section">
      <Box heading="Stage(在该阶段没有分红)">
        {allowance.comparedTo(MAX_UINT256) === 0 ?
            <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
              {/* total Issued */}
              <div style={{flexBasis: '50%'}}>
                <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"HMDX"}/>
              </div>
              {/* Deposit UNI-V2 into Pool */}
              <div style={{flexBasis: '100%', paddingTop: '2%'}}>
                <div>
                  <div style={{display: 'flex'}}>
                    <div className="un-bond-input" style={{width: '60%', minWidth: '6em'}}>
                      <>
                        <BigNumberInput
                            adornment="HMDX"
                            value={depositAmount}
                            setter={setDepositAmount}
                            disabled={status !== 0}
                        />
                      </>
                    </div>
                    <div className="un-bond-max" style={{width: '12%', margin: '0 2%', minWidth: '1em'}}>
                      <MaxButton
                          onClick={() => {
                            setDepositAmount(balance);
                          }}
                      />
                    </div>
                    <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '7em'}}>
                      <Button
                          wide
                          icon={status === 0 ? <IconCirclePlus/> : <IconLock/>}
                          label="Deposit"
                          onClick={() => {
                            depositPool(
                                poolAddress,
                                toBaseUnitBN(depositAmount, UNI.decimals),
                                (hash) => setDepositAmount(new BigNumber(0))
                            );
                          }}
                          disabled={poolAddress === '' || status !== 0 || !isPos(depositAmount)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Withdraw Døllar from DAO */}
              <div style={{flexBasis: '100%', paddingTop: '2%'}}>
                <div>
                  <div style={{display: 'flex'}}>
                    <div className="un-bond-input" style={{width: '60%', minWidth: '6em'}}>
                      <>
                        <BigNumberInput
                            adornment="HMDX"
                            value={withdrawAmount}
                            setter={setWithdrawAmount}
                            disabled={status !== 0}
                        />
                      </>
                    </div>
                    <div className="un-bond-max" style={{width: '12%', margin: '0 2%', minWidth: '1em'}}>
                      <MaxButton
                          onClick={() => {
                            setWithdrawAmount(stagedBalance);
                          }}
                      />
                    </div>
                    <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '6em'}}>
                      <Button
                          wide
                          icon={status === 0 ? <IconCircleMinus/> : <IconLock/>}
                          label="Withdraw"
                          onClick={() => {
                            withdrawPool(
                                poolAddress,
                                toBaseUnitBN(withdrawAmount, UNI.decimals),
                                (hash) => setWithdrawAmount(new BigNumber(0))
                            );
                          }}
                          disabled={poolAddress === '' || status !== 0 || !isPos(withdrawAmount)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="pool-deposit" style={{display: 'flex', flexWrap: 'wrap'}}>
              {/* total Issued */}
              <div style={{flexBasis: '50%'}}>
                <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"HMDX"}/>
              </div>
              <div style={{flexBasis: '8%'}}/>
              {/* Approve Pool to spend UNI-V2 */}
              <div className="withdraw-deposit-btn" style={{flexBasis: '25%', paddingTop: '2%'}}>
                <Button
                    wide
                    icon={<IconCirclePlus />}
                    label="Approve"
                    onClick={() => {
                      approve(UNI.addr, poolAddress);
                    }}
                    disabled={poolAddress === '' || user === ''}
                />
              </div>
            </div>
        }
      </Box>
    </div>
  );
}
export default WithdrawDeposit;
