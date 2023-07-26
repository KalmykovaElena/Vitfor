/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import './index.scss';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useSelector } from 'react-redux';

const Select = ({ data, placeholder, onchangeSelect, error, defaultValue }) => {
  const [selectActive, setSelectActive] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder || data[0]);
  const theme = useSelector((state) => state.auth.theme);
  const ref = useRef();
  useOnClickOutside(ref, () => setSelectActive(''));

  useEffect(() => {
    if (!data.includes(selectedValue)) {
      setSelectedValue(defaultValue || placeholder || data[0]);
    }
    if (defaultValue) {
      setSelected(true);
    }
  }, [data, placeholder, selectedValue, defaultValue]);

  return (
    <div
      className={
        error && selectedValue === placeholder
          ? 'select select__error'
          : selected
          ? `select select_${theme} select__filled`
          : `select select_${theme}`
      }
      ref={ref}
    >
      <div className="select__label">
        {selectedValue}
        <Caret
          className={selectActive ? 'caret-down' : 'caret'}
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
              onchangeSelect(e);
              setSelected(true);
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
