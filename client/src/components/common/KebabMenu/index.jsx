import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export const KebabMenu = ({ advert }) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const [isModalShow, setIsModalShow] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [isDeleteAdvert, setIsDeleteAdvert] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [alertText, setAlertText] = useState('');
  const onModalShow = () => setIsModalShow(true);
  const onModalClose = () => setIsModalShow(false);
  const items = [
    {
      label: 'Редактировать',
      key: 'userAdds',
      onClick: () => {
        getAdvert(advert.advertId);
        dispatch(
          setEditAdvert({
            advertId: advert.advertId,
            title: advert.title,
            description: advert.description,
            price: advert.price,
            phoneNumber: advert.phoneNumber,
            subsectionName: advert.subsectionName,
          })
        );
        navigate(`/sale/${category}/edit/ad/${advert.advertId}`);
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
          onClick: () => changeAdvertsStatus(advert.advertId),
          icon: <Reload />,
        },
    {
      label: 'Удалить',
      key: 'delete',
      onClick: () => {
        setWarningText('Вы уверены, что хотите удалить объявление?');
        setIsDeleteAdvert(true);
        onModalShow();
      },
      icon: <Ban />,
      danger: true,
    },
  ];
  return (
    <>
      <Dropdown className={styles.wrapper} menu={{ items }} trigger={['click']}>
        <Kebab className={classNames(styles.kebab, { [styles.light]: theme === 'light' })} />
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
                  deleteAdvert(advert.advertId).then((response) => {
                    if (response.status === 200) {
                      setIsAlertShow(true);
                      setAlertText('Объявление успешно удалено');
                    }
                  });
                } else {
                  changeAdvertsStatus(advert.advertId).then((response) => {
                    if (response.status === 200) {
                      setIsAlertShow(true);
                      setAlertText('Объявление успешно снято с публикации');
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
