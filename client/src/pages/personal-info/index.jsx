import React from 'react';
import Header from 'components/header';
import './index.scss';
import SideBar from 'components/common/sideBar';
import { personalDataSideBar } from 'constants/personalDataSideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PersonalInfo = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`personal-info personal-info_${theme}`}>
      <Header />
      <main className="main-info">
        <SideBar data={personalDataSideBar} />
        <Outlet />
      </main>
    </section>
  );
};

export default PersonalInfo;
