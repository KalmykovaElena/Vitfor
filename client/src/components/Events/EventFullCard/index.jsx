/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './index.scss';

import camera from 'assets/camera.svg';
import { getEvent } from 'http/Events/getEvent';
import { setEvent } from 'redux/reducers/eventReducer';

const EventFullCard = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const { event } = useSelector((state) => ({
    event: state.event.event,
  }));
  const params = useParams();
  const date = event
    ? new Date(event.startDate).toLocaleDateString('ru-Ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  useEffect(() => {
    if (params.eventId) {
      dispatch(getEvent(params.eventId));
    }
    return () => dispatch(setEvent({}));
  }, []);
  return (
    <>
      {event.eventId && (
        <div className="add">
          <div className="add-wrapper">
            <>
              <div className="add-info">
                <div className="add-title">
                  <span>{event.title}</span>
                  <div className="add-title-date">{date}</div>
                </div>

                <div className="add-photo">
                  {event.poster ? (
                    <img src={`data:image/png;base64,${event.poster}`} alt="advert" className="img" />
                  ) : (
                    <>
                      <img src={camera} alt="advert" className="noimg" />
                      <span>Нет фото</span>
                    </>
                  )}
                </div>
              </div>
              <div className="add-controls">
                <div className="add-controls__title">О мероприятии</div>
                <div className="controls-item">
                  <span className="controls-item__title">Адрес: </span> <span>{event.address}</span>
                </div>
                <div className="controls-item">
                  <span className="controls-item__title">Стоимость билета: </span> <span>{event.price} руб.</span>
                </div>
                <div className="controls-item">
                  <span className="controls-item__title">Телефон: </span> <span>{event.phoneNumber}</span>
                </div>
              </div>
            </>
          </div>
          <div className="add-description">
            <div className="add-content-title">Описание</div>
            <div className="add-description-content">{event.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventFullCard;
