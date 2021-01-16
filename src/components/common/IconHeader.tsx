import React from 'react';

import {
  Header,
} from '@aragon/ui';

type IconHeaderProps = {
  icon: any,
  text: string
}

function IconHeader({ icon, text }: IconHeaderProps) {
  return (
    <>
      <div className="icon-header" style={{ padding: '0 2%', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '2%', fontSize: '0.8rem' }}>
          {icon}
        </div>
        <div className="icon-header-text">
          <Header primary={text} />
        </div>
      </div>
    </>
  );
}

export default IconHeader;
