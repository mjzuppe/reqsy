import React, { useState } from 'react';

export const Submenu = (props: any) => {
  const { options } = props;
  const [selected, setSelected] = useState(options[0]);

  const clickHandler = (e) => {
    props.onClick(e.target.id);
    setSelected(e.target.id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {options.map((option, i) => (
        <div
          onClick={clickHandler}
          style={{ color: option === selected ? '#fff' : '#abacab', paddingRight: '15px', fontWeight: 'bold' }}
          id={option}
          key={`sm-opt-${i}`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};
