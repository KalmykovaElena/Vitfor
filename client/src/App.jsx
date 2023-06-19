import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import NotFound from './pages/not-found/NotFound';
import AboutUs from './pages/about-us/AboutUs';
import Categories from './pages/categories/Categories';
import Events from './pages/events/Events';
import Finds from './pages/finds/Finds';
import News from './pages/news/News';
import Questions from './pages/questions/Questions';
import Sale from './pages/sale/Sale';
import Services from './pages/services/Services';
import Tourism from './pages/tourism/Tourism';
import Weather from './pages/weather/Weather';

function App() {
  return (
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
}

export default App;
