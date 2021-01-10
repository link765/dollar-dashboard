import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus, IconCaution
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import { bond, unbondUnderlying } from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import { ESD, ESDS } from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import TextBlock from "../common/TextBlock";

type BondUnbondProps = {
  staged: BigNumber,
  bonded: BigNumber,
  status: number,
  lockup: number,
};

function BondUnbond({
  staged, bonded, status, lockup
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Bond">
      <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* Total bonded */}
        <div style={{flexBasis: '20%'}}>
          <BalanceBlock asset="Bonded" balance={bonded} suffix={"ESD"}/>
        </div>
        {/* Total bonded */}
        <div style={{flexBasis: '20%'}}>
          <TextBlock label="Exit Lockup" text={lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`}/>
        </div>
        <div style={{flexBasis: '60%'}}>
          <div style={{}}>
            <div style={{display: 'flex'}}>
              <div className="un-bond-input" style={{width: '45%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                      adornment="ESD"
                      value={bondAmount}
                      setter={setBondAmount}
                  />
                </>
              </div>
              <div className="un-bond-max" style={{width: '15%', minWidth: '1em'}}>
                <MaxButton
                  onClick={() => {
                    setBondAmount(staged);
                  }}
                />
              </div>
              <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '7em'}}>
                <Button
                    wide
                    icon={status === 0 ? <IconCirclePlus/> : <IconCaution/>}
                    label="Bond"
                    onClick={() => {
                      bond(
                          ESDS.addr,
                          toBaseUnitBN(bondAmount, ESD.decimals),
                      );
                    }}
                    disabled={status === 2 || !isPos(bondAmount) || bondAmount.isGreaterThan(staged)}
                />
              </div>
            </div>
          </div>
          <div style={{paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div className="un-bond-input" style={{width: '45%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                      adornment="ESD"
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
                      unbondUnderlying(
                          ESDS.addr,
                          toBaseUnitBN(unbondAmount, ESD.decimals),
                      );
                    }}
                    disabled={status === 2 || !isPos(unbondAmount) || unbondAmount.isGreaterThan(bonded)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Bond Døllar within DAO */}
        {/* Unbond Døllar within DAO */}
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{ opacity: 0.5 }}> Bonding events will restart the lockup timer </span>
      </div>
    </Box>
  );
}

export default BondUnbond;
