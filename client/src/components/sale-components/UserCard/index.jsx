/* eslint-disable import/no-extraneous-dependencies */
import { getAdvert } from 'http/getAdvert';
import { saleData } from 'constants/saleData';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { useParams } from 'react-router-dom';
import { ReactComponent as Camera } from 'assets/camera.svg';
import PhotoBlock from '../../common/photoBlock';
import { KebabMenu } from 'components/common/KebabMenu';
import { setAdvert } from 'redux/reducers/advertReducer';

const UserCard = () => {
  const { advert, theme } = useSelector((state) => ({
    advert: state.advert.advert,
    theme: state.auth.theme,
  }));
  const { id } = useParams();
  const dispatch = useDispatch();
  const pathData = saleData.find((saleSection) =>
    saleSection.items?.find((saleSubSection) => saleSubSection.subsection === advert.subsectionName)
  );
  const section = pathData.name;
  const subSection = pathData.items?.find(
    (saleSubSection) => saleSubSection.subsection === advert.subsectionName
  ).label;
  const date = advert
    ? new Date(advert.dateOfCreation).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  useEffect(() => {
    if (id) {
      getAdvert(id);
    }
    return () => dispatch(setAdvert({}));
  }, []);
  return (
    <div className={`userAdd userAdd__${theme}`}>
      {advert.advertId && (
        <div className="userAdd-wrapper">
          <div className="userAdd-content">
            <div className="slider">
              {advert.files?.length > 1 ? (
                <PhotoBlock isUserData={false} files={advert.files} advertId={advert.advertId} />
              ) : (
                <div className="userAdd-photo">
                  {advert.files[0] ? (
                    <img src={`data:image/png;base64,${advert.files[0].fileString}`} alt="advert" className="img" />
                  ) : (
                    <div className="userAdd-photo__noimg">
                      <Camera className="noimg" />
                      <span>Нет фото</span>
                    </div>
                  )}
                </div>
              )}
              <div className="userAdd-price">{advert.price} BYN</div>
            </div>
            <div className="userAdd-info">
              <div className="userAdd-title userAdd-info__item">
                <div>{advert.title}</div>
                <div className="userAdd-title-date">{date}</div>
              </div>
              <div className="userAdd-category userAdd-info__item">
                <div className="userAdd-title">Категория</div>
                <div className="userAdd-category-content">
                  <div className="section">{section}</div>
                  <div className="connect"></div>
                  <div className="section">{subSection}</div>
                </div>
              </div>
              {advert.phoneNumber && (
                <div className="userAdd-phone userAdd-info__item">
                  <div className="userAdd-title">Телефон</div>
                  <div className="userAdd-content">{advert.phoneNumber}</div>
                </div>
              )}
              <div className="userAdd-control">
                Управлять объявлением
                <KebabMenu advert={advert} />
              </div>
            </div>
          </div>
          <div className="userAdd-description">
            <div className="userAdd-title">Описание</div>
            <div className="userAdd-description-content">{advert.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
