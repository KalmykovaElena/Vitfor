import React from 'react';
import Header from 'components/header';
import './index.scss';
import SideBar from 'components/common/sideBar';
import { personalDataSideBar } from 'constants/personalDataSideBar';
import { Outlet } from 'react-router-dom';

const PersonalInfo = () => (
  <section className="personal-info">
    <Header />
    <main className="main-info">
      <SideBar data={personalDataSideBar} />
      <Outlet />
    </main>
  </section>
);

export default PersonalInfo;
