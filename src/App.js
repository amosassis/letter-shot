import React, { useEffect, useState } from 'react';
import './App.css';

import LetterTrack from './components/LetterTrack';


function App() { 
  return (
    <div className="App">
      <header className="App-header">        
        <LetterTrack />        
      </header>
    </div>
  );
}

export default App;
