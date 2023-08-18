import React, { useState } from 'react';
import './index.scss';

const Range = ({ name, value, min, max, step, func, startIcon, endIcon }) => {
  const [rangeValue, setRangeValue] = useState(value);

  return (
    <div className="range">
      {' '}
      <img src={startIcon} alt="start range" />
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={rangeValue}
        step={step}
        onChange={(e) => {
          func(e.target.value, rangeValue);
          setRangeValue(e.target.value);
        }}
      />
      <img src={endIcon} alt="end range" />
    </div>
  );
};

export default Range;
