import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export const Modal = ({ className, onClose, children, isOpen }) => {
  const timerRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const ANIMATION_DELAY = 300;
  const theme = useSelector((state) => state.auth.theme);
  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      {createPortal(
        <div
          className={classNames(
            styles.modal,
            {
              [styles.opened]: isOpen,
              [styles.isClosing]: isClosing,
            },
            [className]
          )}
        >
          <div className={styles.overlay} onClick={closeHandler}>
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
      )}
    </>
  );
};
