import React from 'react';
import { NavLink } from 'react-router-dom';

import { LinkBase, useTheme } from '@aragon/ui';
import ConnectButton from './ConnectButton';

type NavbarProps = {
  hasWeb3: boolean;
  user: string;
  setUser: Function;
};

function NavBar({ hasWeb3, user, setUser }: NavbarProps) {
  const currentTheme = useTheme();
  const logoUrl = `./logo/logo_${currentTheme._name === 'light' ? 'black' : 'white'}.svg`;

  return (
    <>
      <div
        className="nav-bar-container"
        style={{
          backgroundColor: 'none',
          textAlign: 'center',
          width: '100%',
          fontSize: '0.35rem',
          paddingTop: '10px',
          paddingBottom: '10px'
        }}
      >
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '40px', display: 'inline-block', textAlign: 'left', position: 'relative', top: '10px' }}>
                <NavLink to="/" component={LinkBase} style={{ marginRight: '16px', height: '40px' }}>
                  <img src={require("../../assets/img/LOGO2.svg")} height="40px" alt="Galaxy Set Dollar" />
                </NavLink>
              </div>
              <LinkButton title="宾至如归" to="/" />
              <LinkButton title="DAO(单币)" to="/dao/" />
              <LinkButton title="LP(流动性)" to="/pool/" />
              <LinkButton title="数据详情" to="/regulation/" />
              {/*<LinkButton title="Governance" to="/governance/" />*/}
              <LinkButton title="我要买币" to="/trade/" />
              <LinkButton title="优惠券" to="/coupons/" />
              <a href={'/tools/index.html'} style={{textDecoration:'none', color:'white',fontSize:'22px',fontWeight :'bold'}}>工具</a>
            </div>
          </div>
          <div className="nav-connect-btn" style={{ textAlign: 'right', paddingRight: '10px' }}>
            <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </>
  );
}

type linkButtonProps = {
  title: string;
  to: string;
};

function LinkButton({ title, to }: linkButtonProps) {
  return (
    <NavLink
      to={to}
      component={LinkBase}
      external={false}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '8px',
        marginRight: '8px',
        height: '1rem',
        opacity: 1,
        color: '#FFFFFF'
      }}
      activeStyle={{ color: '#FFF1C9' }}
    >
      <span style={{ display: 'block', padding: '1%', fontSize: '0.5rem', fontWeight: 'bold' }}>{title}</span>
    </NavLink>
  );
}

export default NavBar;
