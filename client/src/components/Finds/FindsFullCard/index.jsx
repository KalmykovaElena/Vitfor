/* eslint-disable react-hooks/exhaustive-deps */
import PhotoBlock from 'components/common/photoBlock';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import './index.scss';
import Logo from 'components/logo';
import Button from 'components/common/button';
import phoneIcon from 'assets/Phone2.png';
import messageIcon from 'assets/Message.png';
import camera from 'assets/camera.svg';
import { createChat } from '../../../http/Chat/createChat';
import { chapterNames } from 'constants/chapterNames';
import { Favourites } from 'components/sale-components/Favourites';
import Comments from 'components/sale-components/comments';
import { getFind } from 'http/Finds/getFind';
import { setFind } from 'redux/reducers/findsReducer';
import { KebabMenu } from 'components/common/KebabMenu';

const FindsFullCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const chapter = location.pathname.split('/')[1];
  const { find, isAuth, user } = useSelector((state) => ({
    find: state.find.find,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
  }));
  const [isPhoneShown, setIsPhoneShown] = useState(false);
  const params = useParams();
  const date = find
    ? new Date(find.dateOfCreation).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  useEffect(() => {
    if (params.findId) {
      dispatch(getFind(params.findId));
    }
    return () => dispatch(setFind({}));
  }, []);
  return (
    <>
      {find.findId && (
        <div className="add">
          <div className="add-wrapper">
            <>
              <div className={find.files.length > 1 ? 'add-info add-info__slider' : 'add-info'}>
                <div className="add-title">
                  <span>{find.title}</span>
                  <div className="add-title-date">{date}</div>
                </div>

                {find.files.length > 1 ? (
                  <PhotoBlock files={find.files} advertId={find.advertId} isFavourite={find.isFavourite} />
                ) : (
                  <div className="add-photo">
                    {find.files[0] ? (
                      <img src={`data:image/png;base64,${find.files[0].fileString}`} alt="advert" className="img" />
                    ) : (
                      <>
                        <img src={camera} alt="advert" className="noimg" />
                        <span>Нет фото</span>
                      </>
                    )}
                    <Favourites
                      size="long"
                      id={find.findId}
                      checked={find.isFavourite}
                      adCategory="finds"
                      item={find}
                    />
                  </div>
                )}
              </div>
              <div className="add-controls">
                <div className="add-controls__wrapper">
                  <Logo
                    name="userlogo"
                    img={find.userPhoto}
                    text={find.nickName}
                    subtext={find.userName}
                    textLocation="bottom"
                  />
                  <div className="add-controls__buttons">
                    {find.phoneNumber && (
                      <div className="phone-info">
                        <Button
                          type="primary"
                          name="Показать телефон"
                          icon={phoneIcon}
                          handleClick={() => setIsPhoneShown(!isPhoneShown)}
                        />
                        {isPhoneShown && <div className="phone-info">{find.phoneNumber}</div>}
                      </div>
                    )}
                    {find.userName === user.userName ? (
                      <div className="userAdd-control">
                        Управлять объявлением
                        <KebabMenu advert={find} className="cardKebab" adCategory="finds" />
                      </div>
                    ) : (
                      <Button
                        type="primary"
                        name="Написать сообщение"
                        icon={messageIcon}
                        handleClick={() => {
                          dispatch(
                            createChat({
                              advertId: find.findId,
                              receiverUsername: find.userName,
                              chapterName: chapterNames[chapter],
                            })
                          );
                          navigate('/chat');
                        }}
                        disabled={!isAuth}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="add-description">
            <div className="add-content-title">Описание</div>
            <div className="add-description-content">{find.description}</div>
          </div>
          <div className="add-content-title add-content-title-comments">Комментарии пользователей</div>
          <Comments advert={find} />
        </div>
      )}
    </>
  );
};

export default FindsFullCard;
