import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from 'assets/logo-large.png';
import Logo from 'components/logo';
import './index.scss';
import { ReactComponent as Person } from 'assets/person.svg';
import vector from 'assets/Vector 14.png';
import title1 from 'assets/Vector-14.png';
import title2 from 'assets/Vector-15.png';
import map from 'assets/Linked-Path-Group.png';
import { news } from 'constants/url';
import { useSelector } from 'react-redux';
import Button from '../common/button';

const BrandBook = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`brandbook brandbook__${theme}`}>
      <img className="brandbook-title brandbook-title_left" src={title1} alt="title" />
      <img className="brandbook-title brandbook-title_right" src={title2} alt="title" />
      <div className="brandbook-logo">
        <Logo name="app" img={logo} text="VitFor" textLocation="right" isTextActive="true" />
      </div>
      <div className="brandbook-item">
        <Button name="VitFor" type="logo" handleClick={() => navigate('/')} /> - это все для того, чтобы жизнь витебчан
        и гостей города стала интереснее, ярче, разнообразнее и удобнее.
      </div>
      <img className="vector" src={vector} alt="vector" />
      <div className="brandbook-item">
        <div className="brandbook-item__icons">
          <Person fill={theme === 'dark' ? '#1FCDCD' : '#2A5858'} />
          <Person fill={theme === 'dark' ? '#0056FC' : '#0E347D'} />
          <Person fill={theme === 'dark' ? '#A9FFDB' : '#1B704C'} />
        </div>
        <div className="brandbook-item__description">
          Мы, команда DreamSoft, создали платформу VitFor с целью продвижения культурной жизни Витебска в интернет
          пространстве.
        </div>
      </div>
      <div className="brandbook-map">
        <img src={map} alt="map" />
        <div className="brandbook-item brandbook-map__item">
          <Button name="выбрать нужные услуги либо товары" type="sale" handleClick={() => navigate('/sale')} />
          <Button name="узнать факты из жизни города" type="events" handleClick={() => navigate('/events')} />
          {/* <Button name="узнать интересные для себя новости" type="news" handleClick={() => navigate({ news })} /> */}
          <NavLink className="button button-news" to={news}>
            {' '}
            узнать интересные для себя новости
          </NavLink>
        </div>
      </div>
      <div className="brandbook-item brandbook-item__positioned">
        <Button name="найти забытые вещи" type="finds" handleClick={() => navigate('/finds')} />
        <Button
          name="вдохновляться на прогулки и путешествия"
          type="tourism"
          handleClick={() => navigate('/tourism')}
        />
        <Button name="общаться" type="questions" handleClick={() => navigate('/questions')} />
      </div>
    </section>
  );
};

export default BrandBook;
