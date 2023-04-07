import React, { useState } from 'react';
import UploadCard from './components/UploadCard';
import Footer from './components/Footer';

import './style/App.scss';
import LoadingCard from './components/LoadingCard';

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="App">
      <div id="content-wrap">
        {progress ? (
          <LoadingCard now={progress} />
        ) : (
          <UploadCard setProgress={setProgress} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
