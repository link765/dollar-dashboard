import React, { useState, useEffect } from 'react';
import { LinkBase, Box } from '@aragon/ui';

import BigNumber from 'bignumber.js';
import { getTokenBalance } from '../../utils/infura';
import { toTokenUnitsBN } from '../../utils/number';

import TradePageHeader from './Header';
import {ESD, UNI, USDC} from "../../constants/tokens";
import IconHeader from "../common/IconHeader";


function UniswapPool({ user }: {user: string}) {
  const [pairBalanceESD, setPairBalanceESD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        pairBalanceESDStr, pairBalanceUSDCStr,
      ] = await Promise.all([
        getTokenBalance(ESD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),
      ]);

      if (!isCancelled) {
        setPairBalanceESD(toTokenUnitsBN(pairBalanceESDStr, ESD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <IconHeader icon={<i className="fas fa-exchange-alt"/>} text="Trade"/>

      <TradePageHeader
        pairBalanceESD={pairBalanceESD}
        pairBalanceUSDC={pairBalanceUSDC}
        uniswapPair={UNI.addr}
      />

      <div style={{ padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px'  }}>
          <MainButton
            title="Info"
            description="View GSD-HUSD pool stats."
            icon={<i className="fas fa-chart-area"/>}
            href={"https://info.mdex.com/#/token/0x03fa282789af9e2574a47024b5ef1f5074ede92f"}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px' }}>
          <MainButton
            title="Trade"
            description="Trade døllar tokens."
            icon={<i className="fas fa-exchange-alt"/>}
            href={"https://ht.mdex.com/#/swap?inputCurrency=0x03fa282789af9e2574a47024b5ef1f5074ede92f"}
          />
        </div>

        <div style={{ flexBasis: '45%' }}>
          <MainButton
            title="Supply"
            description="Supply and redeem liquidity."
            icon={<i className="fas fa-water"/>}
            href={"https://ht.mdex.com/#/add/0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047/0x03FA282789AF9E2574A47024b5EF1F5074edE92F"}
          />
        </div>
      </div>
    </>
  );
}

type MainButtonProps = {
  title: string,
  description: string,
  icon: any,
  href:string
}

function MainButton({
  title, description, icon, href,
}:MainButtonProps) {
  return (
    <LinkBase className="main-btn" href={href} style={{ width: '100%' }}>
      <Box>
        <div style={{ fontSize: '0.5rem', color: '#384E7E', fontWeight: 'bold' }}>
          {title}
        </div>
        <span style={{ fontSize: '1rem', }}>
          {icon}
        </span>
        {/*<img alt="icon" style={{ padding: 10, height: 64 }} src={iconUrl} />*/}
        <div style={{ opacity: 0.5, whiteSpace: 'normal', height: '1.1rem' }}>
          {' '}
          {description}
          {' '}
        </div>

      </Box>
    </LinkBase>
  );
}

export default UniswapPool;
