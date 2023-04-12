import React, { useState } from 'react';
import CardBody from './components/CardBody';
import Footer from './components/Footer';

import './style/App.scss';

function App() {
  return (
    <div className="App">
      <div id="content-wrap">
        <CardBody />
      </div>
      <Footer />
    </div>
  );
}

export default App;
