import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, LinkBase, Tag,
} from '@aragon/ui';
import EpochBlock from "../common/EpochBlock";
import {getEpoch, getEpochTime,
} from '../../utils/infura';
import {ESDS} from "../../constants/tokens";
async function epochformatted() {
  const [epochStr, epochTimeStr] = await Promise.all([
        getEpoch(ESDS.addr),
        getEpochTime(ESDS.addr),
      ]);
  //alert(epochStr)
  //alert(epochTimeStr)
  const epochStart = 1610452800;
  const epochPeriod = 2 * 60 * 60;
  const hour = 60 * 60;
  const minute = 60;
  const unixTimeSec = Math.floor(Date.now() / 1000);

  let epochRemainder = unixTimeSec - epochStart
  const epoch = Math.floor(epochRemainder / epochPeriod);
  epochRemainder -= epoch * epochPeriod;
  const epochHour = Math.floor(epochRemainder / hour);
  epochRemainder -= epochHour * hour;
  const epochMinute = Math.floor(epochRemainder / minute);
  epochRemainder -= epochMinute * minute;
  return `${epochStr}-0${epochHour}:${epochMinute > 9 ? epochMinute : "0" + epochMinute.toString()}:${epochRemainder > 9 ? epochRemainder : "0" + epochRemainder.toString()}`;
  //return `${epochStr}`;
  //return `0-00:00:00`;
}

type HomePageProps = {
  user: string
};

function HomePage({user}: HomePageProps) {
  const history = useHistory();

  const [epochTime, setEpochTime] = useState("0-00:00:00");

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        setEpochTime(await epochformatted())
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ flexBasis: '45%' }}>
          <img src={require("../../assets/img/LOGO2.svg")} alt="" style={{ marginRight: '10px',height:'42px' }} />
          <div style={{ color: '#FFF1C9', fontSize: '0.4rem', fontFamily: 'HYk2gj' }}>GALAXY SET DOLLAR</div>
        </div>
        <div className="epoch-btn" style={{ flexBasis: '45%', textAlign: 'right', marginBottom: '10px'}}>
          <Box>
            <EpochBlock epoch={epochTime}/>
          </Box>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px'  }}>
          <MainButton
            title="DAO(质押GSD)"
            description="质押GSD赚取GSD"
            icon={<i className="fas fa-dot-circle"/>}
            onClick={() => {
              history.push('/dao/');
            }}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px' }}>
          <MainButton
            title="LP(质押流动性)"
            description="质押流动性赚取GSD"
            icon={<i className="fas fa-parachute-box"/>}
            onClick={() => {
              history.push('/pool/');
            }}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px' }}>
          <MainButton
            title="数据详情"
            description="展示各池子数据及周期数据"
            icon={<i className="fas fa-chart-area"/>}
            onClick={() => {
              history.push('/regulation/');
            }}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden', marginBottom: '10px' }}>
          <MainButton
              title="工具"
              description="展示年化"
              icon={<i className="fas fa-poll"/>}
              onClick={() => {
                window.location.href='/tools/index.html';
              }}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden' }}>
          <MainButton
              title="我要买币"
              description="买卖GSD"
              icon={<i className="fas fa-exchange-alt"/>}
              onClick={() => {
                history.push('/trade/');
              }}
          />
        </div>

        <div style={{ flexBasis: '45%', overflow: 'hidden'  }}>
          <MainButton
              title="优惠券"
              description="低于$1买入，高于$1赎回"
              icon={<i className="fas fa-ticket-alt"/>}
              onClick={() => {
                history.push('/coupons/');
              }}
          />
        </div>
      </div>
    </>
  );
}

type MainButtonPropx = {
  title: string,
  description: string,
  icon: any,
  onClick: Function,
  tag?:string
}

function MainButton({
  title, description, icon, onClick, tag,
}:MainButtonPropx) {
  return (
    <LinkBase className="main-btn" onClick={onClick} style={{ width: '100%' }}>
      <Box>
        <div style={{ fontSize: '0.5rem', fontWeight: 'bold', color: '#384E7E' }}>
          {title}
          {tag ? <Tag>{tag}</Tag> : <></>}
        </div>
        <span style={{ fontSize: '1rem' }}>
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

export default HomePage;
