import React from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
import { useNavigate } from 'react-router-dom';
import { getAdvert } from 'http/getAdvert';
import { transformDate } from 'utils/transformDate';
import icon from 'assets/camera.svg';

const AdsItem = ({ item, type }) => {
  const navigate = useNavigate();
  const { title, dateOfCreation, price, description } = item;
  const handleClick = () => {
    const response = getAdvert(item.advertId);
    if (response) {
      const pathData = saleData.find((e) => e.section === response.section);
      const category = pathData.link;
      const subCategory = pathData.items.find((e) => e.subsection === response.subsection).search;
      if (subCategory) {
        navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${item.advertId}`);
      } else if (category) {
        navigate(`/sale/${category.slice(1)}/ad/${item.advertId}`);
      }
    }
  };
  return (
    <div className="sale-ads__item" onClick={handleClick}>
      <div className="item-image">
        {item.file ? (
          <img
            src={`data:image/png;base64,${item.file.fileString}`}
            alt="advertisement"
            className="item-image__photo"
          />
        ) : (
          <>
            <img src={icon} alt="advertisement" className="item-image__nophoto" />
          </>
        )}
      </div>
      <div className="item-title">{title}</div>
      {type === 'long' && (
        <>
          <div className="item-price">{price}</div>
          <div className="item-description">{description}</div>
        </>
      )}
      <div className="item-date">{transformDate(dateOfCreation)}</div>
    </div>
  );
};

export default AdsItem;
