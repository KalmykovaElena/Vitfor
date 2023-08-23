/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import PhotoBlock from '../../common/photoBlock';
import { ReactComponent as Camera } from 'assets/camera.svg';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../logo';
import Button from '../../common/button';
import phoneIcon from '../../../assets/Phone2.png';
import messageIcon from '../../../assets/Message.png';
import { useParams } from 'react-router-dom';
import { getService } from '../../../http/Services/getService';
import { Favourites } from 'components/sale-components/Favourites';

export const ServiceFullCard = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { service, isAuth } = useSelector((state) => ({
    service: state.service.service,
    isAuth: state.auth.isAuth,
  }));
  useEffect(() => {
    if (jobId) {
      dispatch(getService(jobId));
    }
  }, []);
  const [isPhoneShown, setIsPhoneShown] = useState(false);
  const date = service
    ? new Date(service.dateOfCreation).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  return (
    <div className={styles.wrapper}>
      {service.jobId && (
        <>
          <div className={styles.serviceInfo}>
            <div className={styles.photoBlock}>
              <div className={styles.title}>
                <div>{service.title}</div>
                <div className={styles.date}>{date}</div>
              </div>
              {service.files?.length > 1 ? (
                <PhotoBlock isUserData={false} files={service.files} advertId={service.advertId} />
              ) : (
                <div className={styles.photo}>
                  {service.files[0] ? (
                    <img
                      src={`data:image/png;base64,${service.files[0].fileString}`}
                      alt="advert"
                      className={styles.img}
                    />
                  ) : (
                    <div className="userAdd-photo__noimg">
                      <Camera className="noimg" />
                      <span>Нет фото</span>
                    </div>
                  )}
                  <Favourites size="long" id={service.jobId} checked={service.isFavourite} adCategory="services" />
                </div>
              )}
            </div>
            <div className={styles.price}>{service.price} BYN</div>
            <div className={styles.descriptionBlock}>
              <div className={styles.title}>Описание</div>
              <div className={styles.description}>{service.description}</div>
            </div>
          </div>
          <div className={styles.userActions}>
            <div className={styles.user}>
              <Logo
                name="userlogo"
                img={service.userPhoto}
                text={service.nickName}
                subtext={service.userName}
                textLocation="bottom"
              />
            </div>
            <div className={styles.buttonGroup}>
              {service.phoneNumber && (
                <div className="phone-info">
                  <Button
                    type="primary"
                    name="Показать телефон"
                    icon={phoneIcon}
                    className={styles.phone_button}
                    handleClick={() => setIsPhoneShown(!isPhoneShown)}
                  />
                  {isPhoneShown && <div className="phone-info">{service.phoneNumber}</div>}
                </div>
              )}

              <Button
                type="primary"
                name="Написать сообщение"
                icon={messageIcon}
                className={styles.button}
                handleClick={() => {
                  console.log('click');
                }}
                disabled={!isAuth}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
