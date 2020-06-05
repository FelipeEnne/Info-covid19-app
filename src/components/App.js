import React from 'react';
import './App.css';
import Summary from '../containers/Summary';
import NavbarApp from './NavbarApp';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavbarApp />
      <Summary />
    </div>
  );
}

export default App;
