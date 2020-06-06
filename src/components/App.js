import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Summary from '../containers/Summary';
import MoreInfected from '../containers/MoreInfected';
import NavbarApp from './NavbarApp';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavbarApp />
        <Summary />
        <Switch>
          <Route path="/">
            <MoreInfected />
          </Route>
          <Route path="/new">
            <Summary />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
