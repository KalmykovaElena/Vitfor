/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { setFavourites } from 'http/setFavourites';
import { useSelector } from 'react-redux';
import { ReactComponent as Heart } from 'assets/heart.svg';
import { ReactComponent as FillingHeart } from 'assets/heart2.svg';

import styles from './index.module.scss';
import { setServicesFavourites } from 'http/Services/setServicesFavourites';
import { setFindFavourites } from 'http/Finds/setFindFavourites';
import { setForumFavourites } from 'http/Forum/setForumFavourites';
import classNames from 'classnames';

export const Favourites = ({ size, id, checked, adCategory, item, className }) => {
  const [isFavourite, setIsFavourite] = useState(checked);
  const { isAuth, user } = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
  }));
  const method = isFavourite ? 'DELETE' : 'POST';

  const handleClick = (event) => {
    event.stopPropagation();
    if (adCategory) {
      if (adCategory === 'services') {
        setServicesFavourites(item.jobId, method);
      }
      if (adCategory === 'finds') {
        setFindFavourites(item.findId, method);
      }
      if (adCategory === 'forum') {
        setForumFavourites(id, method);
      }
    } else {
      setFavourites(id, method);
    }

    setIsFavourite(!isFavourite);
  };
  return (
    <>
      {size === 'long' ? (
        <div
          className={classNames(styles.wrapper, { [styles.hidden]: !isAuth || item?.userName === user?.userName }, [
            className,
          ])}
          onClick={(e) => handleClick(e)}
        >
          <span>{isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'} </span>
          {isFavourite ? <Heart className="heart-icon" /> : <FillingHeart className="heart-icon" />}
        </div>
      ) : (
        <div
          className={classNames(styles.icon, { [styles.hidden]: !isAuth || item?.userName === user?.userName }, [
            className,
          ])}
          onClick={(e) => handleClick(e)}
        >
          {isFavourite ? <Heart className={styles.heart_icon} /> : <FillingHeart className={styles.heart_icon} />}
        </div>
      )}
    </>
  );
};
