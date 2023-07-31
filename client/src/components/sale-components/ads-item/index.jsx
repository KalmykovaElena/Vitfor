import React from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAdvert } from 'http/getAdvert';
import { transformDate } from 'utils/transformDate';

const AdsItem = ({ item, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, dateOfCreation, price, description } = item;
  const handleClick = () => {
    const response = getAdvert(item.advertId, dispatch);
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
        <img src={item.files[0]} alt="advertisement" />
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
