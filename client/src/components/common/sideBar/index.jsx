import React from 'react';
import './index.scss';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ data }) => {
  const location = useLocation();
  const activeData = location.pathname.split('/');

  return (
    <aside className="sideBar">
      {data.map((e) => (
        <Link
          key={e.id}
          to={e.link}
          className={activeData.includes(e.link) ? 'sideBar-item sideBar-item_active' : 'sideBar-item'}
        >
          <div className="sideBar-img" style={{ backgroundImage: `url(${e.img})` }}></div>
          <span>{e.name}</span>
        </Link>
      ))}
    </aside>
  );
};

export default SideBar;
