import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Summary from '../containers/Summary';
import MoreInfected from '../containers/MoreInfected';
import MoreNewInfected from '../containers/MoreNewInfected';
import SearchCountry from '../containers/SearchCountry';
import NavbarApp from './NavbarApp';


const App = () => (
  <div className="App">
    <NavbarApp />
    <Summary />
    <Switch>
      <Route path="/" component={MoreInfected} exact />
      <Route path="/new" component={MoreNewInfected} />
      <Route path="/seach" component={SearchCountry} />
    </Switch>
  </div>
);

export default App;
