/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { saleData } from 'constants/saleData';
import { serverResponses } from 'constants/test';
import { useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import './index.scss';

// import MultipleSelect from 'components/common/multipleSelect';
import AdsItem from '../ads-item';

const SaleAds = () => {
  const params = useParams();

  // const [filterCategory, setFilterCategory] = useState('По умолчанию')
  const data = saleData.find((item) => item.link.slice(1) === params.category);
  // const items = [{
  //   label: 'По умолчанию',
  //   key: '0',
  // },...data.items]
  const { section } = data;
  const subsection = params.type ? data.items.find((item) => item.search === params.type).subsection : '';
  const renderData = serverResponses.filter((item) => {
    if (subsection) {
      return item.section === section && item.subsection === subsection;
    }
    return item.section === section;
  });

  return (
    <section className="sale-ads-wrapper">
      <div className="sale-ads-filter">
        <div className="sale-ads-filter__title">Объявления</div>
        {/* <div className="sale-ads-filter__item">{filterCategory}</div> */}
        {/* <MultipleSelect items={data.items} /> */}
      </div>
      <div className="sale-ads">
        {renderData.length === 0 ? (
          <div className="sale-ads__empty">
            <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
          </div>
        ) : (
          renderData.map((e) => <AdsItem key={e.advertId} item={e} type="long" />)
        )}
      </div>
    </section>
  );
};

export default SaleAds;
