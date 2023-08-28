/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { setFavourites } from 'http/setFavourites';
import { useSelector } from 'react-redux';
import { ReactComponent as Heart } from 'assets/heart.svg';
import { ReactComponent as FillingHeart } from 'assets/heart2.svg';

import styles from './index.module.scss';
import { setServicesFavourites } from 'http/Services/setServicesFavourites';

export const Favourites = ({ size, id, checked, adCategory, item }) => {
  const [isFavourite, setIsFavourite] = useState(checked);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const method = isFavourite ? 'DELETE' : 'POST';

  const handleClick = () => {
    if (adCategory) {
      if (adCategory === 'services') {
        setServicesFavourites(item.jobId, method);
      }
    } else {
      setFavourites(id, method);
    }

    setIsFavourite(!isFavourite);
  };

  return (
    <>
      {size === 'long' ? (
        <div className={isAuth ? styles.wrapper : styles.hidden} onClick={handleClick}>
          <span>{isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'} </span>
          {isFavourite ? <Heart className="heart-icon" /> : <FillingHeart className="heart-icon" />}
        </div>
      ) : (
        <div className={isAuth ? styles.icon : styles.hidden} onClick={handleClick}>
          {isFavourite ? <Heart className={styles.heart_icon} /> : <FillingHeart className={styles.heart_icon} />}
        </div>
      )}
    </>
  );
};
