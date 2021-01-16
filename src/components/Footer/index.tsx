import React from 'react';
import { LinkBase, useTheme } from '@aragon/ui';
import ChangeModeButton from "./SwitchTheme";

type FooterProps = {
  updateTheme: Function,
  theme: string,
  hasWeb3: boolean,
}

function Footer({updateTheme, theme, hasWeb3}: FooterProps) {
  const currentTheme = useTheme();

  return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: currentTheme.surface,
        textAlign: 'center',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: 'auto',
        width: '100%',
        fontSize: '14px'
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div style={{ padding: '2%', display: 'flex'}}>
            <div style={{ width: '50%', textAlign: 'left' }}>
              <FooterLink icon={<i className="fab fa-github"/>} href={"https://github.com/trongalaxy/GSD"}/>
              <FooterLink icon={<i className="fab fa-twitter"/>} href={"https://twitter.com/galaxy_defi"}/>
              <FooterLink icon={<i className="fab fa-medium"/>} href={"https://medium.com/galaxy-lab"}/>
              <FooterLink icon={<i className="fab fa-telegram"/>} href={"https://t.me/galaxy_defi"}/>
              {/*<FooterLink icon={<i className="fab fa-discord"/>} href={"https://discord.gg/vPws9Vp"}/>*/}
            </div>
            <div style={{ width: '45%', textAlign: 'right'}}>
              made with <span role="img" aria-labelledby="heartbreak">💔️</span> by the &#123;TronGalaxy.finance&#125;.
            </div>
            {/*<div style={{ width: '5%', textAlign: 'right', marginTop: '4px' }}>*/}
              {/*<ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme} />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
  );
}

type FooterLinkProp = {
  icon: any,
  href: string,
}

function FooterLink({
  icon, href,
}:FooterLinkProp) {
  return (
    <LinkBase href={href} style={{marginLeft: '5px', marginRight: '5px'}}>
      <span style={{ fontSize: 32 }}>{icon}</span>
    </LinkBase>
  );
}

export default Footer;
