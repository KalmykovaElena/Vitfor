import React from 'react';
import './index.scss';

const AdsItem = ({ item }) => {
  const { title, date } = item;
  return (
    <div className="sale-ads__item">
      <div className="item-image">
        <img src={item.files[0]} alt="advertisement" />
      </div>
      <div className="item-title">{title}</div>
      <div className="item-date">{date}</div>
    </div>
  );
};

export default AdsItem;
