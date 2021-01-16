import React from 'react';

type EpochBlockProps = {
  epoch: string
}

function EpochBlock({ epoch }: EpochBlockProps) {
  return (
    <>
      <div style={{ fontSize: '0.6rem', padding: 3, fontWeight: 'bold', color: '#384E7E' }}>Epoch(周期)</div>
      <div style={{ fontSize: '0.8rem', padding: 3, fontWeight: 'bold', color: '#384E7E', lineHeight: 1.5, fontFamily: 'aragon-ui-monospace, monospace'}}>{epoch}</div>
    </>
  );
}

export default EpochBlock;
