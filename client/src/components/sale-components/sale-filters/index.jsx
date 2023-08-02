/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSortParametr } from 'redux/reducers/advertReducer';

const SaleFilters = ({ data }) => {
  const [openedFilter, setOpenedFilter] = useState(false);
  const [openedSort, setOpenedSort] = useState(false);
  const [filterCategory, setFilterCategory] = useState('По умолчанию');
  const [sortCategory, setSortCategory] = useState('По умолчанию');
  const [current, setCurrent] = useState('0');
  const [filterItem, setFilterItem] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedSortCategory = useSelector((state) => state.advert.sort);
  const items = data?.items
    ? [
        {
          label: 'По умолчанию',
          key: '0',
        },
        ...data.items,
      ]
    : null;

  const onClick = ({ key }) => {
    setCurrent(key);
    const currentItem = items.find((el) => el.key === key);
    setFilterItem(currentItem);
  };
  const filterItems = () => {
    const path = filterItem.search;
    if (path) {
      navigate(`/sale/${data.link.slice(1)}/${path}`);
    } else {
      navigate(`/sale/${data.link.slice(1)}`);
    }
  };

  const handleClick = () => {
    filterItems();
    setFilterCategory(filterItem.label);
    setOpenedFilter(false);
  };
  const setSort = (e) => {
    setSortCategory(e.target.value);
  };
  const handleSort = () => {
    setOpenedSort(false);
    dispatch(setSortParametr(sortCategory));
  };

  return (
    <div className="sale-ads-filter">
      <div className="sale-ads-filter__title">Объявления</div>
      <Dropdown
        dropdownRender={() => (
          <>
            <form>
              <label className="filter-check__label">
                <input
                  onChange={setSort}
                  className="filter-check__input"
                  checked={sortCategory === 'По умолчанию'}
                  type="radio"
                  value="По умолчанию"
                  name="sort"
                />
                <span>По умолчанию</span>
              </label>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Дешевле" name="sort" />
                <span>Дешевле</span>
              </label>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Дороже" name="sort" />
                <span>Дороже</span>
              </label>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="По дате" name="sort" />
                <span>По дате</span>
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
        overlayClassName="navigation-dropdown"
        getPopupContainer={() => document.getElementById('sale')}
      >
        <div
          className={openedFilter ? 'sale-ads-filter__item sale-ads-filter__item_active' : 'sale-ads-filter__item'}
          onClick={() => setOpenedSort(!openedSort)}
        >
          {selectedSortCategory}
          <Caret className={openedSort ? 'caret-down' : 'caret'} />
        </div>
      </Dropdown>
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
  );
};

export default SaleFilters;
