import React from 'react';
import { NavLink } from 'react-router-dom';
import { futerData } from '../../common/futerData';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      {futerData.map((e) => (
        <div className="footer-item" key={e.id}>
          <img src={e.img} alt="logo" />
          <NavLink to={e.link}> {e.name}</NavLink>
        </div>
      ))}
    </footer>
  );
}
