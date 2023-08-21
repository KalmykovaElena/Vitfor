import React, { useEffect, useState } from 'react';
import logo from 'assets/sad.png';
import { getUserAdverts } from 'http/getUserAdverts';
import AdsItem from '../ads-item';
import styles from './index.module.scss';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Активные',
    key: 'active',
  },
  {
    label: 'Снятые с публикации',
    key: 'disabled',
  },
];

const UserAds = () => {
  const { theme, data } = useSelector((state) => ({
    theme: state.auth.theme,
    data: state.advert.adverts,
  }));
  const navigate = useNavigate();
  const [status, setStatus] = useState('Active');
  const [renderData, setRenderData] = useState([]);
  useEffect(() => {
    getUserAdverts();
  }, []);
  useEffect(() => {
    if (data) {
      setRenderData(data.filter((ads) => ads.status === status));
    }
  }, [data, status]);
  const handleTabClick = (activeKey) => {
    if (activeKey === 'active') {
      setStatus('Active');
    } else setStatus('Disabled');
  };
  return (
    <div>
      {data && data.length === 0 ? (
        <div className="sale-ads__empty">
          <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
        </div>
      ) : (
        <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
          <>
            <Tabs defaultActiveKey="active" items={items} onChange={handleTabClick} />
            <div className={styles.adverts}>
              {renderData.map((advert) => (
                <AdsItem
                  key={advert.advertId}
                  item={advert}
                  isUserAds
                  type="long"
                  handleClick={() => {
                    navigate(`/sale/user_ads/ad/${advert.advertId}`);
                  }}
                />
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default UserAds;
