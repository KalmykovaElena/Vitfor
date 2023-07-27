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

const AdCard = () => {
  const advert = useSelector((state) => state.advert.advert);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getAdvert(params.id, dispatch);
  }, []);

  return (
    <>
      {advert.advertId && (
        <div className="add">
          <div className="add-wrapper">
            <>
              <div className="add-info">
                <div className="add-title">{advert.title}</div>
                <PhotoBlock files={advert.files} onMainClick={() => setIsModalOpen(true)} />
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
        </div>
      )}
    </>
  );
};

export default AdCard;
