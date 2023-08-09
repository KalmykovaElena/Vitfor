/* eslint-disable react-hooks/exhaustive-deps */
import PhotoBlock from 'components/common/photoBlock';
import { getAdvert } from 'http/getAdvert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './index.scss';
import Logo from 'components/logo';
import Slider from 'components/common/slider';
import { Modal } from 'antd';
import Button from 'components/common/button';
import phoneIcon from 'assets/Phone2.png';
import messageIcon from 'assets/Message.png';
import camera from 'assets/camera.svg';
import Comments from '../comments';

const AdCard = () => {
  const advert = useSelector((state) => state.advert.advert);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const date = advert
    ? new Date(advert.dateOfCreation).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  console.log(params);
  useEffect(() => {
    getAdvert(params.id, dispatch);
  }, []);
  return (
    <>
      {advert.advertId && (
        <div className="add">
          <div className="add-wrapper">
            <>
              <div className={advert.files.length > 1 ? 'add-info add-info__slider' : 'add-info'}>
                <div className="add-title">
                  <span>{advert.title}</span>
                  <div className="add-title-date">{date}</div>
                </div>
                {advert.files.length > 1 ? (
                  <PhotoBlock files={advert.files} onMainClick={() => setIsModalOpen(true)} />
                ) : (
                  <div className="add-photo">
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

                <div className="add-price">{advert.price} BYN</div>
              </div>
              <div className="add-controls">
                <div className="add-controls__wrapper">
                  <Logo
                    name="userlogo"
                    img={advert.userPhoto}
                    text={advert.nickName}
                    subtext={advert.userName}
                    textLocation="bottom"
                  />
                  <div className="add-controls__buttons">
                    <Button type="primary" name="Показать телефон" icon={phoneIcon} />
                    <Button type="primary" name="Написать сообщение" icon={messageIcon} />
                  </div>
                </div>
              </div>
            </>
          </div>
          <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            maskStyle={{ background: '#0000001a', backdropFilter: 'blur(5.5px)' }}
            closeIcon={null}
            footer={null}
            wrapClassName="slider-wrapper"
            width="50%"
            height="50%"
          >
            <Slider files={advert.files} />
          </Modal>
          <div className="add-description">
            <div className="add-content-title">Описание</div>
            <div className="add-description-content">{advert.description}</div>
          </div>
          <div className="add-content-title add-content-title-comments">Комментарии пользователей</div>
          <Comments advert={advert} />
        </div>
      )}
    </>
  );
};

export default AdCard;
