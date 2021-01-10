import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus, IconCaution
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {bondPool, unbondPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {UNI} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import TextBlock from "../common/TextBlock";

type BondUnbondProps = {
  poolAddress: string,
  staged: BigNumber,
  bonded: BigNumber,
  status: number,
  lockup: number,
};

function BondUnbond({
  poolAddress, staged, bonded, status, lockup
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Bond">
      <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* Total bonded */}
        <div style={{flexBasis: '20%', paddingTop: '32px'}}>
          <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"} />
        </div>
        {/* Exit lockup */}
        <div style={{flexBasis: '20%', paddingTop: '32px'}}>
          <TextBlock label="Exit Lockup" text={lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`}/>
        </div>
        {/* Bond UNI-V2 within Pool */}
        <div style={{flexBasis: '60%'}}>
          <div style={{}}>
            <div style={{display: 'flex'}}>
              <div className="un-bond-input" style={{width: '45%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={bondAmount}
                    setter={setBondAmount}
                  />
                </>
              </div>
              <div className="un-bond-max" style={{width: '15%', minWidth: '1em'}}>
                <>
                  <MaxButton
                    onClick={() => {
                      setBondAmount(staged);
                    }}
                  />
                </>
              </div>
              <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '7em'}}>
                <Button
                    wide
                    icon={status === 0 ? <IconCirclePlus/> : <IconCaution/>}
                    label="Bond"
                    onClick={() => {
                      bondPool(
                          poolAddress,
                          toBaseUnitBN(bondAmount, UNI.decimals),
                          (hash) => setBondAmount(new BigNumber(0))
                      );
                    }}
                    disabled={poolAddress === '' || !isPos(bondAmount)}
                />
              </div>
            </div>
          </div>
          {/* Unbond UNI-V2 within Pool */}
          <div style={{paddingTop: '20px'}}>
            <div style={{display: 'flex'}}>
              <div className="un-bond-input" style={{width: '45%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={unbondAmount}
                    setter={setUnbondAmount}
                  />
                </>
              </div>
              <div className="un-bond-max" style={{width: '15%', minWidth: '1em'}}>
                <MaxButton
                  onClick={() => {
                    setUnbondAmount(bonded);
                  }}
                />
              </div>
              <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '7em'}}>
                <Button
                    wide
                    icon={status === 0 ? <IconCircleMinus/> : <IconCaution/>}
                    label="Unbond"
                    onClick={() => {
                      unbondPool(
                          poolAddress,
                          toBaseUnitBN(unbondAmount, UNI.decimals),
                          (hash) => setUnbondAmount(new BigNumber(0))
                      );
                    }}
                    disabled={poolAddress === '' || !isPos(unbondAmount)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{ opacity: 0.5 }}> Bonding events will restart the lockup timer </span>
      </div>
    </Box>
  );
}

export default BondUnbond;
