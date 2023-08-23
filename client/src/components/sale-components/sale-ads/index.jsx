/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { saleData } from 'constants/saleData';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import './index.scss';
import { useSelector } from 'react-redux';
import { getAllAdverts } from 'http/getAllAdverts';
import AdsItem from '../ads-item';
import SaleFilters from '../sale-filters';
import { sortItems } from 'utils/sortItems';

const SaleAds = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [renderData, setRenderData] = useState();
  const productsQuery = searchParams.get('products');
  const data = saleData.find((item) => item.link.slice(1) === params.category);
  const sortCategory = useSelector((state) => state.advert.sort);
  const { section } = data;
  const dataRef = useRef();
  dataRef.current = renderData;
  const subsection =
    params.type && params.category !== 'search'
      ? data.items.find((item) => item.search === params.type).subsection
      : '';

  useEffect(() => {
    if (subsection) {
      getAllAdverts('FindBySubsectionName', 'subsectionName', subsection, setRenderData, sortItems);
    } else if (section) {
      getAllAdverts('FindBySectionName', 'sectionName', section, setRenderData, sortItems);
    }

    if (renderData) setRenderData(sortItems(sortCategory, renderData));
    if (params.category === 'user_ads') setRenderData(null);
  }, [params.category, productsQuery, section, sortCategory, subsection]);
  return (
    <section className="sale-ads-wrapper" id="sale">
      {renderData && (
        <>
          {data.filters !== false && <SaleFilters data={data} setRenderData={setRenderData} renderData={renderData} />}
          <div className="sale-ads">
            {renderData.length === 0 ? (
              <div className="sale-ads__empty">
                <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
              </div>
            ) : (
              renderData.map((advert) => (
                <AdsItem
                  key={advert.advertId}
                  item={advert}
                  type="long"
                  handleClick={() => {
                    const pathData = saleData.find((saleSection) =>
                      saleSection.items?.find((saleSubSection) => saleSubSection.subsection === advert.subsectionName)
                    );
                    const category = pathData.link;
                    const subCategory = pathData.items.find(
                      (saleSubSection) => saleSubSection.subsection === advert.subsectionName
                    ).search;
                    if (subCategory) {
                      navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${advert.advertId}`);
                    } else if (category) {
                      navigate(`/sale/${category.slice(1)}/ad/${advert.advertId}`);
                    }
                  }}
                />
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SaleAds;
