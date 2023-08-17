import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Pencil } from 'assets/pencil.svg';
import { ReactComponent as Power } from 'assets/power.svg';
import { ReactComponent as Reload } from 'assets/reload.svg';
import { ReactComponent as Ban } from 'assets/ban.svg';
import { ReactComponent as Kebab } from 'assets/kebab-menu.svg';
import styles from './index.module.scss';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setEditAdvert } from '../../../redux/reducers/advertReducer';
import { getAdvert } from '../../../http/getAdvert';
import { changeAdvertsStatus } from '../../../http/Advert/changeAdvertsStatus';
import { deleteAdvert } from '../../../http/Advert/deleteAdvert';

export const KebabMenu = ({ advert }) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
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
          onClick: () => changeAdvertsStatus(advert.advertId),
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
      onClick: () => deleteAdvert(advert.advertId),
      icon: <Ban />,
      danger: true,
    },
  ];
  return (
    <Dropdown className={styles.wrapper} menu={{ items }} trigger={['click']}>
      <Kebab className={classNames(styles.kebab, { [styles.light]: theme === 'light' })} />
    </Dropdown>
  );
};
