import React from 'react';
import './App.css';
import PayloadForm from './components/PayloadForm';
import Header from './components/Header';
import Description from './components/Description';

function App() {
  return (
    <>
      <Header/>
      <Description/>
      <PayloadForm/>
    </>
  );
}

export default App;
