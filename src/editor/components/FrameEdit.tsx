import React from 'react';

export interface FrameEditProps {
  prop1: string;
}

export default function FrameEdit({ prop1 }: FrameEditProps) {
  const nr = 42;
  return (
    <>
      <div className='FrameEdit'>{prop1}</div>
      <div className='FrameEdit'>{nr}</div>
    </>
  );
}
