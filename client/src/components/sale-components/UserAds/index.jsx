import React, { useEffect, useState } from 'react';
import logo from 'assets/sad.png';
import { getUserAdverts } from 'http/getUserAdverts';
import AdsItem from '../ads-item';
import styles from './index.module.scss';

const UserAds = () => {
  const [renderData, setRenderData] = useState([]);
  useEffect(() => {
    getUserAdverts(setRenderData);
  }, []);
  return (
    <div>
      {renderData.length === 0 ? (
        <div className="sale-ads__empty">
          <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
        </div>
      ) : (
        <div className={styles.ads}>
          <div className={styles.wrapper}>
            {renderData.map((advert) => (
              <AdsItem key={advert.advertId} item={advert} type="long" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAds;
