import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Summary from '../containers/Summary';
import MoreInfected from '../containers/CountriesCases/MoreInfected';
import MoreNewInfected from '../containers/NewCountriesCases/MoreNewInfected';
import SearchCountry from '../containers/SearchCountry/SearchCountry';
import NavbarApp from './NavbarApp';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <div className="App">
    <Router>
      <NavbarApp />
      <Summary />
      <Switch>
        <Route path="/" component={MoreInfected} exact />
        <Route path="/new" component={MoreNewInfected} />
        <Route path="/seach" component={SearchCountry} />
      </Switch>
    </Router>
  </div>
);

export default App;
