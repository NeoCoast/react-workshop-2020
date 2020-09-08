import React from 'react';
import { ReactComponent as NeoCoastLogo } from 'Assets/neocoast-logo.svg';
import './index.scss';

const Home = () => (
  <div className="home">
    <NeoCoastLogo width={300} />
    <h1>
      Welcome to the Home page of your React App
    </h1>
    <h5>
      Bolierplate made with <span role="img" aria-label="love">♥️</span> by <a href="https://www.neocoast.com" target="_blank" rel="nofollow">NeoCoast</a>
    </h5>
  </div>
);

export default Home;
