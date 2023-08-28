import React, { useEffect, useState } from 'react';
import logo from 'assets/sad.png';
import { getUserAdverts } from 'http/getUserAdverts';
import AdsItem from '../ads-item';
import styles from './index.module.scss';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { advertTitles } from 'constants/advertTitles';

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
    data: state.search.searchItems,
  }));
  const navigate = useNavigate();
  const [status, setStatus] = useState('Active');
  const [renderData, setRenderData] = useState([]);
  useEffect(() => {
    getUserAdverts();
  }, []);
  useEffect(() => {
    if (data) {
      setRenderData(
        Object.keys(data).reduce((acc, category) => {
          acc[category] = data[category].filter((advert) => advert.status === status);
          return acc;
        }, {})
      );
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
              {Object.keys(renderData).map((AdvertCategory) => {
                if (renderData[AdvertCategory].length > 0) {
                  return (
                    <div className={styles.category} key={AdvertCategory}>
                      <div className={styles.title}>{advertTitles[AdvertCategory]}</div>
                      <div className={styles.content}>
                        {renderData[AdvertCategory].map((advert) => {
                          let category;
                          if (AdvertCategory === 'adverts') {
                            category = 'sale';
                          } else if (AdvertCategory === 'jobs') {
                            category = 'services';
                          }
                          return (
                            <AdsItem
                              key={advert.advertId || advert.jobId}
                              item={advert}
                              isUserAds
                              type="long"
                              adCategory={category}
                              handleClick={() => {
                                navigate(`${category}/ad/${advert.advertId || advert.jobId}`);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default UserAds;
