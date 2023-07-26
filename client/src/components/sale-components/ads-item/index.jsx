import React from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAdvert } from 'http/getAdvert';

const AdsItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, date } = item;
  const handleClick = () => {
    const response = getAdvert(item.id, dispatch);
    if (response) {
      const category = saleData.find((e) => e.section === response.section).link;
      if (category) navigate(`${category.slice(1)}/ad/${item.id}`);
    }
  };
  return (
    <div className="sale-ads__item" onClick={handleClick}>
      <div className="item-image">
        <img src={item.files[0]} alt="advertisement" />
      </div>
      <div className="item-title">{title}</div>
      <div className="item-date">{date}</div>
    </div>
  );
};

export default AdsItem;
