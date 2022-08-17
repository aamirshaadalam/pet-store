import React from 'react';
import '../styles/toolbar.scss';

export default function Toolbar({ icons }) {
  return (
    <div className='toolbar'>
      {icons.map((icon, index) => (
        <i key={index} className={`icon-${icon.name}`} onClick={() => icon.action()} title={icon.tooltip}></i>
      ))}
    </div>
  );
}
