import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import icon from 'assets/camera.svg';
import styles from './index.module.scss';

export const AdvertPreview = ({ className }) => {
  const { theme, advert } = useSelector((state) => ({
    theme: state.auth.theme,
    advert: state.chat.advert,
  }));
  return (
    <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' }, [className])}>
      <img className={styles.img} src={`data:image/png;base64,${advert.advertPhoto}` ?? icon} alt="" />
      <div className={styles.title}>
        <div className={styles.name}>{advert.advertTitle}</div>
        <div className={styles.cost}>{`${advert.advertPrice} BYN`}</div>
      </div>
    </div>
  );
};
