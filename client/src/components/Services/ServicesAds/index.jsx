import { getServicesBySubSection } from 'http/Services/getServicesBySubSection';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import AdsItem from 'components/sale-components/ads-item';
import { jobsCategories, jobsItems } from 'constants/Jobs/jobsData';
import { useSelector } from 'react-redux';
import { sortItems } from 'utils/sortItems';
import ServicesFilter from '../ServicesFilter';

const ServicesAds = () => {
  const { category, type } = useParams();
  const [renderData, setRenderData] = useState();
  const navigate = useNavigate();
  const sortCategory = useSelector((state) => state.advert.sort);
  useEffect(() => {
    if (category && type) {
      const { subsection } = jobsItems.find((subCategory) => subCategory.search === type);
      const { section } = jobsCategories.find((advertSection) => advertSection.link === `/${category}`);
      getServicesBySubSection(section, subsection, setRenderData);
    }
  }, [category, type]);
  useEffect(() => {
    if (renderData) setRenderData(sortItems(sortCategory, renderData));
  }, [sortCategory]);
  return (
    <section className="sale-ads-wrapper" id="service">
      {renderData && (
        <>
          <ServicesFilter />
          {/* {data.filters !== false && <SaleFilters data={data} setRenderData={setRenderData} renderData={renderData} />} */}
          <div className="sale-ads">
            {renderData.length === 0 ? (
              <div className="sale-ads__empty">
                <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
              </div>
            ) : (
              renderData.map((advert) => (
                <AdsItem
                  key={advert.jobId}
                  item={advert}
                  type="long"
                  handleClick={() => {
                    const { link } = jobsCategories.find(
                      (advertSection) => advertSection.section === advert.sectionName
                    );
                    const { search } = jobsItems.find(
                      (advertSubSection) => advertSubSection.subsection === advert.subsectionName
                    );
                    navigate(`/services${link}/${search}/ad/${advert.jobId}`);
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

export default ServicesAds;
