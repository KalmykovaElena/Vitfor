/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSortParametr } from 'redux/reducers/advertReducer';

const SaleFilters = ({ data }) => {
  const [openedFilter, setOpenedFilter] = useState(false);
  const [openedSort, setOpenedSort] = useState(false);
  const [sortCategory, setSortCategory] = useState('');
  const [current, setCurrent] = useState('0');
  const [filterItem, setFilterItem] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const { items } = data;

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
    setOpenedFilter(false);
  };
  const setSort = (e) => {
    setSortCategory(e.target.value);
  };
  const handleSort = () => {
    setOpenedSort(false);
    dispatch(setSortParametr(sortCategory));
  };

  useEffect(() => {
    const currentSubcategory = items?.find((item) => item.search === params.type);
    if (currentSubcategory) setCurrent(currentSubcategory.key);
  }, []);
  return (
    <div className="sale-ads-filter">
      <div className="sale-ads-filter__title">Объявления</div>
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
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Дешевле" name="sort" />
                <span>Дешевле</span>
              </label>
              <label className="filter-check__label">
                <input onChange={setSort} className="filter-check__input" type="radio" value="Дороже" name="sort" />
                <span>Дороже</span>
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
        getPopupContainer={() => document.getElementById('sale')}
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
          overlayClassName={`navigation-dropdown navigation-dropdown__${theme}`}
          getPopupContainer={() => document.getElementById('sale')}
        >
          <div
            className={
              openedFilter
                ? `sale-ads-filter__item sale-ads-filter__item_${theme} sale-ads-filter__item_active`
                : `sale-ads-filter__item sale-ads-filter__item_${theme}`
            }
            onClick={() => setOpenedFilter(!openedFilter)}
          >
            категория
            <Caret className={openedFilter ? 'caret-down' : 'caret'} />
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default SaleFilters;
