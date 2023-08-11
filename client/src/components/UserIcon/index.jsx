import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export const UserIcon = ({ img, userName, className }) => (
  <div className={classNames(styles.wrapper, [className])}>
    {img ? (
      <div>
        <img className={styles.img} src={img} alt="oops" />
      </div>
    ) : (
      <div className={styles.letterIcon}>{userName?.slice(0, 1).toUpperCase() || null}</div>
    )}
  </div>
);
