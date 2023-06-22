import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/about-us';
import Categories from './pages/categories';
import Events from './pages/events';
import Finds from './pages/finds';
import Main from './pages/main';
import News from './pages/news';
import Questions from './pages/questions';
import Sale from './pages/sale';
import Services from './pages/services';
import Tourism from './pages/tourism';
import Weather from './pages/weather';
import NotFound from './pages/not-found';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Main />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
