/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PhotoBlock from 'components/common/photoBlock';
import { getAdvert } from 'http/getAdvert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './index.scss';
import Logo from 'components/logo';

const AdCard = () => {
  const advert = useSelector((state) => state.advert.advert);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getAdvert(params.id, dispatch);
  }, []);

  return (
    <div className="add">
      <div className="add-wrapper">
        {advert.advertId && (
          <><div className="add-info">
            <div className="add-title">{advert.title}</div>
            <PhotoBlock files={advert.files} />
            <div className="add-price">{advert.price}</div>
          </div>
          <div className="add-controls">
          <Logo
              name="userlogo"
              img={advert.userPhoto}
              text={advert.userName}
              subtext={advert.nickName}
              textLocation="bottom"
            />
            </div></>
        )}
      </div>
    </div>
  );
};

export default AdCard;
