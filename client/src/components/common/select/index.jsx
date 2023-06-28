import React, { useState } from 'react';
import './index.scss';
import CaretDown from 'assets/CaretDown.png';
import CaretUp from 'assets/CaretUp.png';

const Select = ({ data }) => {
  const [selectActive, setSelectActive] = useState('');
  const [selectedValue, setSelectedValue] = useState(data[0]);
  return (
    <div className="select">
      <div className="select__label">
        {selectedValue}
        <img
          role="presentation"
          src={selectActive ? CaretUp : CaretDown}
          alt="arrow down"
          onClick={() => setSelectActive(selectActive ? '' : 'active')}
        />
      </div>
      <ul className={`select__drop-down ${selectActive}`}>
        {data.map((e) => (
          <li
            key={`select-${e}`}
            className="select__item"
            role="presentation"
            onClick={() => {
              setSelectActive('');
              setSelectedValue(e);
            }}
          >
            {e}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
