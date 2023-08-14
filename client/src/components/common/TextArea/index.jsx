import React, { useState } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const { TextArea } = Input;

export const TextAreaComponent = ({ value, onChange, placeholder, onPressEnter, className }) => {
  const theme = useSelector((state) => state.auth.theme);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={styles.wrapper}>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onPressEnter={onPressEnter}
        onBlur={() => {
          if (!value) {
            setIsFocused(false);
          }
        }}
        onFocus={() => setIsFocused(true)}
        autoSize
        className={classNames(styles.textArea, { [styles.light]: theme === 'light', [styles.text]: isFocused }, [
          className,
        ])}
        style={{ resize: 'none' }}
      />
    </div>
  );
};
