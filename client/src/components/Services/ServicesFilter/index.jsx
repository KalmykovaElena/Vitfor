/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSortParametr } from 'redux/reducers/advertReducer';
import './index.scss';

const ServicesFilter = () => {
  const [openedSort, setOpenedSort] = useState(false);
  const [sortCategory, setSortCategory] = useState('');
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);

  const setSort = (e) => {
    setSortCategory(e.target.value);
  };
  const handleSort = () => {
    setOpenedSort(false);
    dispatch(setSortParametr(sortCategory));
  };
  return (
    <div className="ads-filter">
      <div className="ads-filter__title">Объявления</div>
      <Dropdown
        dropdownRender={() => (
          <>
            <form>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Новые" name="sort" />
                <span>Новые</span>
              </label>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Старые" name="sort" />
                <span>Старые</span>
              </label>
              <div>
                <Button type="primary" onClick={() => handleSort(sortCategory)}>
                  Применить
                </Button>
              </div>
            </form>
          </>
        )}
        trigger="click"
        open={openedSort}
        overlayClassName={`navigation-dropdown navigation-dropdown__${theme}`}
        getPopupContainer={() => document.getElementById('service')}
      >
        <div
          className={
            openedSort
              ? `sale-ads-filter__item sale-ads-filter__item_${theme} sale-ads-filter__item_active`
              : `sale-ads-filter__item sale-ads-filter__item_${theme}`
          }
          onClick={() => setOpenedSort(!openedSort)}
        >
          фильтр
          <Caret className={openedSort ? 'caret-down' : 'caret'} />
        </div>
      </Dropdown>
    </div>
  );
};

export default ServicesFilter;
