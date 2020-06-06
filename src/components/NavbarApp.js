import React from 'react';
import { Link } from 'react-router-dom';

const NavbarApp = () => (
  <div className="nav-app">
    <h2 className="nav-title">Info COVID19</h2>
    <Link to="/"><h3 className="navlink">Countries with more people infected</h3></Link>
    <Link to="/new"><h3 className="navlink">Countries with more new infected</h3></Link>
    <h3 className="navlink">Search your country</h3>
  </div>
);

export default NavbarApp;
