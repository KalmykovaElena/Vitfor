/* eslint-disable react-hooks/exhaustive-deps */
import { getAdvert } from 'http/getAdvert';
import PhotoBlock from 'components/common/photoBlock';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import Logo from 'components/logo';
import Slider from 'components/common/slider';
import { Modal } from 'antd';
import Button from 'components/common/button';
import phoneIcon from 'assets/Phone2.png';
import messageIcon from 'assets/Message.png';
import camera from 'assets/camera.svg';
import Comments from '../comments';
import { createChat } from '../../../http/Chat/createChat';
import { Favourites } from '../Favourites';
import { setAdvert } from 'redux/reducers/advertReducer';
import { chapterNames } from 'constants/chapterNames';
// import { chatAction } from 'redux/reducers/chatReducer';

const AdCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const chapter = location.pathname.split('/')[1];
  const { advert, isAuth, user, theme } = useSelector((state) => ({
    advert: state.advert.advert,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    theme: state.auth.theme,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneShown, setIsPhoneShown] = useState(false);
  const params = useParams();
  const date = advert
    ? new Date(advert.dateOfCreation).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  useEffect(() => {
    if (params.id) {
      getAdvert(params.id);
    }
    return () => dispatch(setAdvert({}));
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
                  <PhotoBlock
                    files={advert.files}
                    advertId={advert.advertId}
                    onMainClick={() => setIsModalOpen(true)}
                    isFavourite={advert.isFavourite}
                  />
                ) : (
                  <div className={`add-photo add-photo__${theme}`}>
                    {advert.files[0] ? (
                      <img src={`data:image/png;base64,${advert.files[0].fileString}`} alt="advert" className="img" />
                    ) : (
                      <>
                        <img src={camera} alt="advert" className="noimg" />
                        <span>Нет фото</span>
                      </>
                    )}
                    <Favourites size="long" id={advert.advertId} checked={advert.isFavourite} item={advert} />
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
                    {advert.phoneNumber && (
                      <div className="phone-info">
                        <Button
                          type="primary"
                          name="Показать телефон"
                          icon={phoneIcon}
                          handleClick={() => setIsPhoneShown(!isPhoneShown)}
                        />
                        {isPhoneShown && <div className="phone-info">{advert.phoneNumber}</div>}
                      </div>
                    )}

                    <Button
                      type="primary"
                      name="Написать сообщение"
                      icon={messageIcon}
                      handleClick={() => {
                        dispatch(
                          createChat({
                            advertId: advert.advertId,
                            receiverUsername: advert.userName,
                            chapterName: chapterNames[chapter],
                          })
                        );
                        navigate('/chat');
                      }}
                      disabled={!isAuth || advert.userName === user.userName}
                    />
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
