import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Pencil } from 'assets/pencil.svg';
import { ReactComponent as Power } from 'assets/power.svg';
import { ReactComponent as Reload } from 'assets/reload.svg';
import { ReactComponent as Ban } from 'assets/ban.svg';
import { ReactComponent as Kebab } from 'assets/kebab-menu.svg';
import { ReactComponent as Seccess } from 'assets/checkmark-circle.svg';
import styles from './index.module.scss';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setEditAdvert } from '../../../redux/reducers/advertReducer';
import { getAdvert } from '../../../http/getAdvert';
import { changeAdvertsStatus } from '../../../http/Advert/changeAdvertsStatus';
import { deleteAdvert } from '../../../http/Advert/deleteAdvert';
import { Modal } from '../Modal';
import Button from '../button';
import { Alert } from '../Alert';
import { getUserAdverts } from 'http/getUserAdverts';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { changeServiceStatus } from 'http/Services/ChangeServiceStatus';
import { deleteService } from 'http/Services/deleteService';
import { getService } from 'http/Services/getService';

export const KebabMenu = ({ advert, className, adCategory }) => {
  // const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const searchItems = useSelector((state) => state.search.searchItems);
  const [isModalShow, setIsModalShow] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [isDeleteAdvert, setIsDeleteAdvert] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [alertText, setAlertText] = useState('');
  const onModalShow = () => setIsModalShow(true);
  const onModalClose = () => setIsModalShow(false);
  const idName = advert.advertId ? 'advertId' : 'jobId';
  const changeStatus = advert.advertId ? changeAdvertsStatus : changeServiceStatus;
  const deleteAd = advert.advertId ? deleteAdvert : deleteService;
  const changeAdvertList = (status) => {
    const changedAdvertList = Object.keys(searchItems).reduce((acc, advertCategory) => {
      if (status === 'Deleted') {
        acc[advertCategory] = searchItems[advertCategory].filter((ad) => ad[idName] !== advert[idName]);
      } else {
        acc[advertCategory] = searchItems[advertCategory].map((ad) => {
          if (ad[idName] === advert[idName]) {
            return { ...advert, status };
          }
          return ad;
        });
      }
      return acc;
    }, {});
    dispatch(setSearchItems(changedAdvertList));
  };
  const items = [
    {
      label: 'Редактировать',
      key: 'userAdds',
      onClick: () => {
        if (advert.advertId) {
          getAdvert(advert.advertId);
        }
        if (advert.jobId) {
          dispatch(getService(advert.jobId));
        }

        dispatch(
          setEditAdvert({
            advertId: advert.advertId || advert.jobId,
            title: advert.title,
            description: advert.description,
            price: advert.price,
            phoneNumber: advert.phoneNumber,
            subsectionName: advert.subsectionName,
          })
        );
        navigate(`/search/userads/${adCategory}/edit/ad/${advert.advertId || advert.jobId}`);
      },
      icon: <Pencil />,
    },

    advert.status === 'Active'
      ? {
          label: 'Снять с публикации',
          key: 'status',
          onClick: () => {
            setWarningText('Вы уверены, что хотите снять объявление с публикации?');
            setIsDeleteAdvert(false);
            onModalShow();
          },
          icon: <Power />,
          danger: true,
        }
      : {
          label: 'Восстановить',
          key: 'reuse',
          onClick: () => {
            changeStatus(advert[idName]);
            changeAdvertList('Active');
          },
          icon: <Reload />,
        },
    {
      label: 'Удалить',
      key: 'delete',
      onClick: () => {
        setWarningText('Вы уверены, что хотите удалить объявление?');
        setIsDeleteAdvert(true);
        onModalShow();
        getUserAdverts();
      },
      icon: <Ban />,
      danger: true,
    },
  ];
  return (
    <>
      <Dropdown className={styles.wrapper} menu={{ items }} trigger={['click']}>
        <Kebab className={classNames(styles.kebab, { [styles.light]: theme === 'light' }, [className])} />
      </Dropdown>
      <Modal isOpen={isModalShow} onClose={onModalClose}>
        <div className={classNames(styles.modalWrapper)}>
          <div
            className={classNames(styles.modalText, {
              [styles.modalTextLight]: theme === 'light',
            })}
          >
            {warningText}
          </div>
          <div className={styles.modalBottomGroup}>
            <Button
              className={styles.modalButton}
              type="secondary"
              name="Да"
              handleClick={() => {
                if (isDeleteAdvert) {
                  deleteAd(advert[idName]).then((response) => {
                    if (response.status === 200) {
                      setIsAlertShow(true);
                      setAlertText('Объявление успешно удалено');
                      setTimeout(() => {
                        changeAdvertList('Deleted');
                      }, 4002);
                    }
                  });
                } else {
                  changeStatus(advert[idName]).then((response) => {
                    if (response.status === 200) {
                      setIsAlertShow(true);
                      setAlertText('Объявление успешно снято с публикации');
                      setTimeout(() => {
                        changeAdvertList('Disabled');
                      }, 4002);
                    }
                  });
                }
                onModalClose();
              }}
            ></Button>
            <Button className={styles.modalButton} type="secondary" name="Нет" handleClick={onModalClose}></Button>
          </div>
        </div>
      </Modal>
      <Alert isShow={isAlertShow} onClose={() => setIsAlertShow(false)}>
        <div className={styles.alertMessage}>
          {' '}
          {alertText} <Seccess />{' '}
        </div>
      </Alert>
    </>
  );
};
