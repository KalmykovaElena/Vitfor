import React from 'react';
import './index.scss';
import { transformDate } from 'utils/transformDate';
import icon from 'assets/camera.svg';
import { Favourites } from '../Favourites';
import { KebabMenu } from '../../common/KebabMenu';

const AdsItem = ({ item, type, handleClick, isUserAds = false, adCategory, hideFavourite, hidePrice }) => (
  <div className="sale-ads__item">
    <div className="item-image" onClick={handleClick}>
      {item.mainPhoto || item.poster ? (
        <img
          src={`data:image/png;base64,${item.mainPhoto || item.poster}`}
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
      {item.title}
      {isUserAds ? (
        <KebabMenu advert={item} adCategory={adCategory} />
      ) : hideFavourite ? null : (
        <Favourites size="short" id={item.advertId} checked={item.isFavourite} adCategory={adCategory} item={item} />
      )}
    </div>
    {type === 'long' && !hidePrice && (
      <>
        <div className="item-price">{item.price} BYN</div>
        <div className="item-description">{item.description}</div>
      </>
    )}
    <div className="item-date">
      {transformDate(item.dateOfCreation || item.startDate, adCategory === 'events' && 'short')}
    </div>
  </div>
);

export default AdsItem;
