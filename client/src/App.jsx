import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AboutUs from 'pages/about-us';
import Categories from 'pages/categories';
import Events from 'pages/events';
import Finds from 'pages/finds';
import Main from 'pages/main';
import News from 'pages/news';
import Questions from 'pages/questions';
import Sale from 'pages/sale';
import Services from 'pages/services';
import Tourism from 'pages/tourism';
import Weather from 'pages/weather';
import NotFound from 'pages/not-found';
import Authorization from 'pages/authorization';
import PersonalInfo from 'pages/personal-info';
import PersonalData from 'components/personalData';
import SafetyNavigation from 'components/safety-components/safety-navigation';
import SafetySending from 'components/safety-components/safety-sending';
import Privacy from 'pages/privacy';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'http/getUserProfile';
import HelpSection from 'components/helpSection';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile(token, navigate, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`App App_${theme}`}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="//" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/events" element={<Events />} />
        <Route path="/finds" element={<Finds />} />
        <Route path="/news" element={<News />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/recovery" element={<Authorization />} />
        <Route path="/registration" element={<Authorization />} />
        <Route path="/Auth/ResetPassword" element={<Authorization />} />
        <Route path="/registration/privacy" element={<Privacy />} />
        <Route path="personal_info/*" element={<PersonalInfo />}>
          <Route path="data" element={<PersonalData />} />
          <Route path="safety" element={<SafetyNavigation />} />
          <Route path="safety/mail" element={<SafetySending />} />
          <Route path="safety/password" element={<SafetySending />} />
          <Route path="safety/resetpassword" element={<SafetySending />} />
          <Route path="safety/phone" element={<SafetySending />} />
          <Route path="safety/phone/confirm" element={<SafetySending />} />
          <Route path="help" element={<HelpSection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
