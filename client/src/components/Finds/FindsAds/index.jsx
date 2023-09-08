/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import AdsItem from 'components/sale-components/ads-item';
import { useSelector } from 'react-redux';
import { sortItems } from 'utils/sortItems';
import { findsCategories } from 'constants/findsData';
import { getFindsBySection } from 'http/Finds/getFindsBySection';
import Filter from 'components/common/Filter';

const FindsAds = () => {
  const { category } = useParams();
  const [renderData, setRenderData] = useState();
  const navigate = useNavigate();
  const sortCategory = useSelector((state) => state.advert.sort);
  useEffect(() => {
    if (category) {
      const { section } = findsCategories.find((advertSection) => advertSection.link === `/${category}`);
      getFindsBySection(section, setRenderData);
    }
  }, [category]);
  useEffect(() => {
    if (renderData) setRenderData(sortItems(sortCategory, renderData));
  }, [sortCategory]);
  return (
    <section className="sale-ads-wrapper" id="finds">
      {renderData && (
        <>
          <Filter container="finds" />
          <div className="sale-ads">
            {renderData.length === 0 ? (
              <div className="sale-ads__empty">
                <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
              </div>
            ) : (
              renderData.map((advert) => (
                <AdsItem
                  key={advert.findId}
                  item={advert}
                  type="long"
                  adCategory="finds"
                  hidePrice="true"
                  handleClick={() => {
                    const { link } = findsCategories.find((item) => item.section === advert.subsectionName);
                    navigate(`/finds${link}/ad/${advert.findId}`);
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

export default FindsAds;
