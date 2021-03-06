import React from 'react';

type TextBlockProps = {
  label: string,
  text: string
}

function TextBlock({ label, text }: TextBlockProps) {
  return (
    <>
      <div style={{ fontSize: 16, padding: 3, fontWeight: 'bold'  }}>{label}</div>
      <div style={{ fontSize: 24, padding: 3, fontWeight: 'bold'  }}>{text}</div>
    </>
  );
}

export default TextBlock;
