import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import { saleData } from 'constants/saleData';
import { useSearchParams } from 'react-router-dom';
import AdPlacingForm from '../ad-placing-form';

const AdPlacing = () => {
  const theme = useSelector((state) => state.auth.theme);
  const [searchParms, setSearchParams] = useSearchParams();
  return (
    <section className={`adplacing adplacing__${theme}`}>
      {searchParms.size > 0 ? (
        <AdPlacingForm />
      ) : (
        <div className="adplacing-wrapper">
          <div className="adplacing-title">Выберите категорию</div>
          <div className="adplacing-content">
            {saleData.slice(4).map((e) => (
              <div
                key={e.id}
                className="adplacing-content__item"
                style={{ borderColor: e.color.dark, color: e.color.dark }}
                onClick={() => setSearchParams({ category: e.link.slice(1) })}
              >
                <img src={e.img} alt="icon" />
                <span className="item__name">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdPlacing;
