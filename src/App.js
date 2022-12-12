import { useState } from 'react';
import './App.css';
import Collaborater from './Collaborater';
import Header from './Header';
import Main from './Main';
import Success from './Success';


function App() {
  return (
    <div className="App">
        <Header/>
        <Collaborater/>
        <Main/>
    </div>
  );
}

export default App;