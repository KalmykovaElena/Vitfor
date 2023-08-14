import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import icon from 'assets/camera.svg';
import styles from './index.module.scss';

export const AdvertPreview = ({ name, cost, img, className }) => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' }, [className])}>
      <img className={styles.img} src={img ?? icon} alt="" />
      <div className={styles.title}>
        <div className={styles.name}>{name}</div>
        <div className={styles.cost}>{`${cost} BYN`}</div>
      </div>
    </div>
  );
};
