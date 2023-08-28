/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { getAdvert } from 'http/getAdvert';
import { saleData } from 'constants/saleData';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { useParams } from 'react-router-dom';
import { ReactComponent as Camera } from 'assets/camera.svg';
import PhotoBlock from '../../common/photoBlock';
import { KebabMenu } from 'components/common/KebabMenu';
import { setAdvert } from 'redux/reducers/advertReducer';
import { getService } from 'http/Services/getService';
import { setService } from 'redux/reducers/serviseReduser';

const UserCard = () => {
  const [renderAdvert, setRenderAdvert] = useState(null);
  const { advert, service, theme } = useSelector((state) => ({
    advert: state.advert.advert,
    service: state.service.service,
    theme: state.auth.theme,
  }));
  const { id, type } = useParams();
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
      if (type === 'sale') {
        getAdvert(id);
      }

      if (type === 'services') {
        dispatch(getService(id));
      }
    }
    return () => {
      dispatch(setAdvert({}));
      dispatch(setService({}));
    };
  }, []);
  useEffect(() => {
    if (type === 'sale' && advert.advertId) {
      setRenderAdvert(advert);
    }

    if (type === 'services' && service.jobId) {
      setRenderAdvert({ ...service, advertId: service.jobId });
    }
  }, [advert, service]);
  return (
    <div className={`userAdd userAdd__${theme}`}>
      {renderAdvert && (
        <div className="userAdd-wrapper">
          <div className="userAdd-content">
            <div className="slider">
              {renderAdvert.files?.length > 1 ? (
                <PhotoBlock isUserData={false} files={renderAdvert.files} advertId={renderAdvert.advertId} />
              ) : (
                <div className="userAdd-photo">
                  {renderAdvert.files[0] ? (
                    <img
                      src={`data:image/png;base64,${renderAdvert.files[0].fileString}`}
                      alt="advert"
                      className="img"
                    />
                  ) : (
                    <div className="userAdd-photo__noimg">
                      <Camera className="noimg" />
                      <span>Нет фото</span>
                    </div>
                  )}
                </div>
              )}
              <div className="userAdd-price">{renderAdvert.price} BYN</div>
            </div>
            <div className="userAdd-info">
              <div className="userAdd-title userAdd-info__item">
                <div>{renderAdvert.title}</div>
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
                  <div className="userAdd-content">{renderAdvert.phoneNumber}</div>
                </div>
              )}
              <div className="userAdd-control">
                Управлять объявлением
                <KebabMenu advert={renderAdvert} className="cardKebab" adCategory={type} />
              </div>
            </div>
          </div>
          <div className="userAdd-description">
            <div className="userAdd-title">Описание</div>
            <div className="userAdd-description-content">{renderAdvert.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
