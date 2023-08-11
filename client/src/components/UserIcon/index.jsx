import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export const UserIcon = (props) => {
  const { img, userName, className } = props;
  return (
    <div className={classNames(styles.wrapper, [className])}>
      {img ? (
        <img src={img} alt="oops" />
      ) : (
        <div className={styles.letterIcon}>{userName?.slice(0, 1).toUpperCase() || null}</div>
      )}
    </div>
  );
};
