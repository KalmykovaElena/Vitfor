import React from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdvert } from 'http/getAdvert';
import { transformDate } from 'utils/transformDate';
import icon from 'assets/camera.svg';
import { Favourites } from '../Favourites';

const AdsItem = ({ item, type }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { title, dateOfCreation, price, description } = item;
  const id = item.advertId || item.id;
  const handleClick = () => {
    const response = getAdvert(id, params.category);

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
    <div className="sale-ads__item">
      <div className="item-image" onClick={handleClick}>
        {item.mainPhoto ? (
          <img
            src={`data:image/png;base64,${item.mainPhoto}`}
            alt="advertisement"
            className="item-image item-image__photo"
          />
        ) : (
          <>
            <img src={icon} alt="advertisement" className="item-image item-image__nophoto" />
          </>
        )}
      </div>
      <div className="item-title">
        {title}
        <Favourites size="short" id={item.advertId} checked={item.isFavourite} />
      </div>
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
