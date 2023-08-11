import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import icon from 'assets/camera.svg';
import styles from './index.module.scss';

export const AdvertPreview = ({ advertId }) => {
  const dispatch = useDispatch;
  useEffect(() => {
    // TODO reducer for chat
    dispatch(advertId);
  }, []);
  const response = useSelector();
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
      <img src={response.img ?? icon} alt="" />
      <div className={styles.title}>
        <div className={styles.name}>{response.name}</div>
        <div className={styles.cost}>{`${response.cost} BYN`}</div>
      </div>
    </div>
  );
};
