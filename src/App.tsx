import React from 'react';
import Footer from './components/Footer';
import CardBody from './components/CardBody';

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
