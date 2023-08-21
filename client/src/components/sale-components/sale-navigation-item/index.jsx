import React from 'react';
import './index.scss';
import { Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SaleNavigationItem = ({ item, withDropDown }) => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const { name, img, link, color, items, search, label } = item;
  const renderColor = typeof color === 'object' ? color[theme] : color;
  const onClick = ({ key }) => {
    const path = items.find((el) => el.key === key).search;
    if (path) {
      navigate(`${link.slice(1)}/${path}`);
    } else {
      navigate(link.slice(1));
    }
  };
  const handleClick = () => {
    navigate(link?.slice(1) || search);
  };

  return (
    <>
      {withDropDown ? (
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          overlayClassName={`navigation-dropdown navigation-dropdown__${theme}`}
        >
          <Space>
            <div className="navigation-item" style={{ backgroundColor: renderColor }} onClick={handleClick}>
              <div className="navigation-item__name">{name}</div>
              <div className="navigation-item__icon">
                <img src={img} alt="icon" />{' '}
              </div>
            </div>
          </Space>
        </Dropdown>
      ) : (
        <div className="navigation-item" style={{ backgroundColor: renderColor }} onClick={handleClick}>
          <div className="navigation-item__name">{name || label}</div>
          {img && (
            <div className="navigation-item__icon">
              <img src={img} alt="icon" />{' '}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SaleNavigationItem;
