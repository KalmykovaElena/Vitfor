/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { saleData } from 'constants/saleData';
import { serverResponses } from 'constants/test';
import { useNavigate, useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import './index.scss';
import { Button, Dropdown } from 'antd';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import AdsItem from '../ads-item';

const SaleAds = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();
  const [openedFilter, setOpenedFilter] = useState(false);
  const [filterItem, setFilterItem] = useState();
  const [filterCategory, setFilterCategory] = useState('По умолчанию');
  const [current, setCurrent] = useState('0');
  const data = saleData.find((item) => item.link.slice(1) === params.category);
  const items = data?.items
    ? [
        {
          label: 'По умолчанию',
          key: '0',
        },
        ...data.items,
      ]
    : null;
  const { section } = data;
  const subsection =
    params.type && params.category !== 'search'
      ? data.items.find((item) => item.search === params.type).subsection
      : '';
  const renderData =
    params.category !== 'search'
      ? serverResponses.filter((item) => {
          if (subsection) {
            return item.section === section && item.subsection === subsection;
          }
          return item.section === section;
        })
      : serverResponses.filter(
          (item) =>
            item.title.toLowerCase().includes(params.type.toLowerCase()) ||
            item.description.toLowerCase().includes(params.type.toLowerCase()) ||
            item.description.toLowerCase().includes(params.type.toLowerCase())
        );
  const onClick = ({ key }) => {
    setCurrent(key);
    const currentItem = items.find((el) => el.key === key);
    setFilterItem(currentItem);
  };
  const handleClick = () => {
    const path = filterItem.search;
    if (path) {
      navigate(`/sale/${data.link.slice(1)}/${path}`);
    } else {
      navigate(`/sale/${data.link.slice(1)}`);
    }
    setFilterCategory(filterItem.label);
    setOpenedFilter(false);
  };

  return (
    <section className="sale-ads-wrapper" id="sale">
      <div className="sale-ads-filter">
        <div className="sale-ads-filter__title">Объявления</div>
        {params.category !== 'search' && (
          <Dropdown
            menu={{
              items,
              onClick,
              selectable: true,
              selectedKeys: [current],
            }}
            dropdownRender={(menu) => (
              <>
                <div>
                  {menu}
                  <div>
                    <Button type="primary" onClick={handleClick}>
                      Применить
                    </Button>
                  </div>
                </div>
              </>
            )}
            trigger="click"
            open={openedFilter}
            onOpenChange={() => console.log('onOpenChange')}
            overlayClassName="navigation-dropdown"
            getPopupContainer={() => document.getElementById('sale')}
          >
            <div
              className={openedFilter ? 'sale-ads-filter__item sale-ads-filter__item_active' : 'sale-ads-filter__item'}
              onClick={() => setOpenedFilter(!openedFilter)}
            >
              {filterCategory}
              <Caret className={openedFilter ? 'caret-down' : 'caret'} />
            </div>
          </Dropdown>
        )}
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
