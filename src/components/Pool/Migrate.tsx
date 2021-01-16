import React, { useState } from 'react';
import {
  Box, Button, IconArrowDown, IconCircleMinus,
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock,
} from '../common/index';
import {claimPool, unbondPool, withdrawPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {ESD, UNI} from "../../constants/tokens";

type MigrateProps = {
  legacyPoolAddress: string,
  staged: BigNumber,
  claimable: BigNumber,
  bonded: BigNumber,
  status: number,
  isRewardNegative: boolean,
};

function Migrate({
  legacyPoolAddress, staged, claimable, bonded, status, isRewardNegative
}: MigrateProps) {
  const [unbonded, setUnbonded] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="block-section">
      <Box heading="Migrate">
      <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* Unbond UNI-V2 within Pool */}
        <div style={{flexBasis: '50%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div className="withdraw-deposit-btn" style={{width: '100%'}}>
              <BalanceBlock asset="Bonded" balance={bonded} suffix={"HMDX"} />
              <Button
                style={{width: '80%'}}
                wide
                icon={<IconCircleMinus/>}
                label="Unbond"
                onClick={() => {
                  unbondPool(
                    legacyPoolAddress,
                    toBaseUnitBN(bonded, UNI.decimals),
                    (hash) => setUnbonded(hash.length > 0)
                  );
                }}
                disabled={legacyPoolAddress === '' || !isPos(bonded) || unbonded || isRewardNegative}
              />
            </div>
          </div>
        </div>
        {/* Withdraw UNI-V2 within Pool */}
        <div style={{flexBasis: '50%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div className="withdraw-deposit-btn" style={{width: '100%'}}>
              <BalanceBlock asset="Staged" balance={staged} suffix={"HMDX"} />
              <Button
                style={{width: '80%'}}
                wide
                icon={<IconCircleMinus/>}
                label="Withdraw"
                onClick={() => {
                  withdrawPool(
                    legacyPoolAddress,
                    toBaseUnitBN(staged, UNI.decimals),
                    (hash) => setWithdrawn(hash.length > 0)
                  );
                }}
                disabled={legacyPoolAddress === '' || !isPos(staged) || withdrawn || status !== 0}
              />
            </div>
          </div>
        </div>
        {/* Claim ESD within Pool */}
        <div style={{flexBasis: '50%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div className="withdraw-deposit-btn" style={{width: '100%'}}>
              <BalanceBlock asset="Claimable" balance={claimable} suffix={"GSD"} />
              <Button
                style={{width: '80%'}}
                wide
                icon={<IconArrowDown/>}
                label="Claim"
                onClick={() => {
                  claimPool(
                    legacyPoolAddress,
                    toBaseUnitBN(claimable, ESD.decimals),
                    (hash) => setClaimed(hash.length > 0)
                  );
                }}
                disabled={legacyPoolAddress === '' || !isPos(claimable) || claimed || status !== 0}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default Migrate;
