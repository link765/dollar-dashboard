import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton, PriceSection,
} from '../common/index';
import {approve, purchaseCoupons} from '../../utils/web3';

import {isPos, toBaseUnitBN, toTokenUnitsBN} from '../../utils/number';
import {ESD, ESDS} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import {getCouponPremium} from "../../utils/infura";
import BigNumberInput from "../common/BigNumberInput";

type PurchaseCouponsProps = {
  user: string,
  allowance: BigNumber,
  balance: BigNumber,
  debt: BigNumber,
};

function PurchaseCoupons({
  user, balance, allowance, debt,
}: PurchaseCouponsProps) {
  const [purchaseAmount, setPurchaseAmount] = useState(new BigNumber(0));
  const [premium, setPremium] = useState(new BigNumber(0));

  const updatePremium = async (purchaseAmount) => {
    if (purchaseAmount.lte(new BigNumber(0))) {
      setPremium(new BigNumber(0));
      return;
    }
    const purchaseAmountBase = toBaseUnitBN(purchaseAmount, ESD.decimals);
    const premium = await getCouponPremium(ESDS.addr, purchaseAmountBase)
    const premiumFormatted = toTokenUnitsBN(premium, ESD.decimals);
    setPremium(premiumFormatted);
  };

  return (
    <div className="block-section">
      <Box heading="购买">
        {allowance.comparedTo(MAX_UINT256) === 0 ?
            <div className="pool-deposit bond-un-bond" style={{display: 'flex', flexWrap: 'wrap'}}>
              {/* User balance */}
              <div style={{flexBasis: '50%'}}>
                <BalanceBlock asset={`余额`} balance={balance} suffix={" GSD"}/>
              </div>
              {/* Purchase coupons */}
              <div style={{flexBasis: '100%', paddingTop: '2%'}}>
                <div>
                  <div style={{display: 'flex'}}>
                    <div className="un-bond-input" style={{width: '60%', minWidth: '6em'}}>
                      <>
                        <BigNumberInput
                            adornment="GSD"
                            value={purchaseAmount}
                            setter={(value) => {
                              setPurchaseAmount(value);
                              isPos(value) ? updatePremium(value) : updatePremium(new BigNumber(0));
                            }}
                        />
                      </>
                    </div>
                    <div className="un-bond-max" style={{width: '12%', margin: '0 2%', minWidth: '1em'}}>
                      <MaxButton
                          onClick={() => {
                            const maxPurchaseAmount = debt.comparedTo(balance) > 0 ? balance : debt
                            setPurchaseAmount(maxPurchaseAmount);
                            updatePremium(maxPurchaseAmount);
                          }}
                      />
                    </div>
                    <div className="withdraw-deposit-btn" style={{width: '40%', minWidth: '6em'}}>
                      <Button
                          wide
                          icon={<IconCircleMinus/>}
                          label="Burn"
                          onClick={() => {
                            purchaseCoupons(
                                ESDS.addr,
                                toBaseUnitBN(purchaseAmount, ESD.decimals),
                            );
                          }}
                          disabled={user === '' || debt.isZero() || balance.isZero() || !isPos(purchaseAmount)}
                      />
                    </div>
                  </div>
                </div>
                <PriceSection label="Coupons " amt={purchaseAmount.plus(premium)}/>
              </div>
            </div>
            :
            <div className="pool-deposit" style={{display: 'flex', flexWrap: 'wrap'}}>
              {/* User balance */}
              <div style={{flexBasis: '50%'}}>
                <BalanceBlock asset={`Døllar Balance`} balance={balance}/>
              </div>
              <div style={{flexBasis: '8%'}}/>
              {/* Approve DAO to spend Døllar */}
              <div className="withdraw-deposit-btn" style={{flexBasis: '25%', paddingTop: '2%'}}>
                <Button
                    wide
                    icon={<IconCirclePlus/>}
                    label="Approve"
                    onClick={() => {
                      approve(ESD.addr, ESDS.addr);
                    }}
                    disabled={user === ''}
                />
              </div>
            </div>
        }
      </Box>
    </div>
  );
}

export default PurchaseCoupons;
