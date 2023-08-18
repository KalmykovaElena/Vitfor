import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';

export const Alert = ({ children, clasName, isShow, onClose }) => {
  const theme = useSelector((state) => state.auth.theme);
  const [showAlert, setShowAlert] = useState(false);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isShow) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isShow]);
  const onContentClick = (event) => {
    event.stopPropagation();
  };
  return createPortal(
    <div
      className={classNames(
        styles.wrapper,
        {
          [styles.opened]: showAlert,
          [styles.isClosing]: !showAlert,
        },
        [clasName]
      )}
    >
      <div className={styles.overlay}>
        <div
          className={classNames(styles.content, {
            [styles.light]: theme === 'light',
          })}
          onClick={onContentClick}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
