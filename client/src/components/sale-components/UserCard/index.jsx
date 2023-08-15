/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { Carousel } from '3d-react-carousal';
import { useSelector } from 'react-redux';
import './index.scss';
import { useParams } from 'react-router-dom';
import { getAdvert } from 'http/getAdvert';
import camera from 'assets/camera.svg';
import { saleData } from 'constants/saleData';

const UserCard = () => {
  const advert = useSelector((state) => state.advert.advert);
  const params = useParams();
  const slides = advert.files?.map((file) => <img src={`data:image/png;base64,${file.fileString}`} alt="advert" />);
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
    if (!advert.advertId) {
      getAdvert(params.id, 'user_ads');
    }
  }, []);
  return (
    <div className="userAdd">
      {advert.advertId && (
        <div className="userAdd-wrapper">
          <div className="userAdd-content">
            <div className="slider">
              {advert.files?.length > 1 ? (
                <Carousel slides={slides} />
              ) : (
                <div className="userAdd-photo">
                  {advert.files[0] ? (
                    <img src={`data:image/png;base64,${advert.files[0].fileString}`} alt="advert" className="img" />
                  ) : (
                    <>
                      <img src={camera} alt="advert" className="noimg" />
                      <span>Нет фото</span>
                    </>
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
              <div className="userAdd-control">Управлять объявлением</div>
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
