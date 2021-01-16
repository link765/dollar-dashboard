import React, { useState } from 'react';
import {
  Box, Button, IconArrowDown
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {claimPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {ESD} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";

type ClaimProps = {
  poolAddress: string
  claimable: BigNumber,
  status: number
};

function Claim({
  poolAddress, claimable, status
}: ClaimProps) {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0));

  return (
    <div className="block-section">
      <Box heading="Claim">
        <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '50%'}}>
            <BalanceBlock asset="Claimable" balance={claimable} suffix={"GSD"} />
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{flexBasis: '50%'}}/>
          <div style={{flexBasis: '100%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div className="un-bond-input" style={{width: '45%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                      adornment="GSD"
                      value={claimAmount}
                      setter={setClaimAmount}
                      disabled={status !== 0}
                  />
                </>
              </div>
              <div className="un-bond-max" style={{width: '12%', margin: '0 2%', minWidth: '1em'}}>
                <MaxButton
                    onClick={() => {
                      setClaimAmount(claimable);
                    }}
                />
              </div>
              <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '6em'}}>
                <Button
                    wide
                    icon={<IconArrowDown/>}
                    label="Claim"
                    onClick={() => {
                      claimPool(
                          poolAddress,
                          toBaseUnitBN(claimAmount, ESD.decimals),
                          (hash) => setClaimAmount(new BigNumber(0))
                      );
                    }}
                    disabled={poolAddress === '' || status !== 0 || !isPos(claimAmount)}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
          <span style={{ opacity: 0.5 }}> Unbond to make rewards claimable after your status is Unlocked </span>
        </div>
      </Box>
    </div>
  );
}

export default Claim;
