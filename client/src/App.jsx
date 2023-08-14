import { getUserProfile } from 'http/getUserProfile';
import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AboutUs from 'pages/about-us';
import Events from 'pages/events';
import Finds from 'pages/finds';
import Main from 'pages/main';
import Questions from 'pages/questions';
import Sale from 'pages/sale';
import Services from 'pages/services';
import Weather from 'pages/weather';
import NotFound from 'pages/not-found';
import Authorization from 'pages/authorization';
import PersonalInfo from 'pages/personal-info';
import PersonalData from 'components/personalData';
import Privacy from 'pages/privacy';
import { useSelector } from 'react-redux';
import HelpSection from 'components/helpSection';
import ResetPassword from 'components/resetPassword';
import SaleHomePage from 'components/sale-components/sale-home-page';
import SaleAds from 'components/sale-components/sale-ads';
import AdCard from 'components/sale-components/ad-card';
import Forum from 'pages/forum';
import AdPlacing from 'components/sale-components/ad-placing';
import { history } from 'utils/history';
import SearchPage from 'pages/SearchPage';

const App = () => {
  history.navigate = useNavigate();
  history.location = useLocation();
  const theme = useSelector((state) => state.auth.theme);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`App App_${theme}`}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/finds" element={<Finds />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/sale/*" element={<Sale />}>
          <Route path="" element={<SaleHomePage />} />
          <Route path=":category/:type" element={<SaleAds />} />
          <Route path=":category" element={<SaleAds />} />
          <Route path=":category/:type/ad/:id" element={<AdCard />} />
          <Route path=":category/ad/:id" element={<AdCard />} />
          <Route path="adplacing" element={<AdPlacing />} />
        </Route>
        <Route path="/services" element={<Services />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/recovery" element={<Authorization />} />
        <Route path="/registration" element={<Authorization />} />
        <Route path="/Auth/ResetPassword" element={<Authorization />} />
        <Route path="/confirm" element={<Authorization />} />
        <Route path="/registration/privacy" element={<Privacy />} />
        <Route path="personal_info/*" element={<PersonalInfo />}>
          <Route path="data" element={<PersonalData />} />
          <Route path="help" element={<HelpSection />} />
          <Route path="data/password" element={<ResetPassword />} />
          <Route path="data/resetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
