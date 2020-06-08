import React from 'react';
import PropTypes from 'prop-types';

const FooterApp = ({ value }) => (
  <div className="footer-app">
    <h5>Date</h5>
    <p>
      {value}
    </p>
  </div>
);

FooterApp.propTypes = {
  value: PropTypes.string.isRequired,
};

export default FooterApp;
