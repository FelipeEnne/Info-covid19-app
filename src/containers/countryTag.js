import React from 'react';
import PropTypes from 'prop-types';

const CountryTag = ({ value }) => (
  <div className="divCateg row">
    <div className="col-sm">
      <h5>Country: </h5>
      <p>{value.Country}</p>
    </div>
    <div className="col-sm">
      <h5>Total Confirmed: </h5>
      <p>{value.TotalConfirmed}</p>
    </div>
    <div className="col-sm">
      <h5>Total Deaths: </h5>
      <p>{value.TotalDeaths}</p>
    </div>
    <div className="col-sm">
      <h5>Total Recovered: </h5>
      <p>{value.TotalRecovered}</p>
    </div>
  </div>
);


CountryTag.propTypes = {
  value: PropTypes.shape({
    Country: PropTypes.string,
    TotalConfirmed: PropTypes.number,
    TotalDeaths: PropTypes.number,
    TotalRecovered: PropTypes.number,
  }).isRequired,
};


export default CountryTag;
