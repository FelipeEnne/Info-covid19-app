import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../Helper/helpers';

const CountryInfo = ({ value }) => (
  <div>
    <div className="divCategInfo row">
      <div className="col-sm">
        <h5>Country: </h5>
        <p>{value.Country}</p>
      </div>
      <div className="col-sm">
        <h5>Total Confirmed: </h5>
        <p>{numberFormat(value.TotalConfirmed)}</p>
      </div>
      <div className="col-sm">
        <h5>Total Deaths: </h5>
        <p>{numberFormat(value.TotalDeaths)}</p>
      </div>
      <div className="col-sm">
        <h5>Total Deaths: </h5>
        <p>{numberFormat(value.TotalDeaths)}</p>
      </div>
    </div>
    <div className="divCategInfo row">
      <div className="col-sm">
        <h5>New Confirmed: </h5>
        <p>{numberFormat(value.NewConfirmed)}</p>
      </div>
      <div className="col-sm">
        <h5>New Deaths: </h5>
        <p>{numberFormat(value.NewDeaths)}</p>
      </div>
      <div className="col-sm">
        <h5>New Recovered: </h5>
        <p>{numberFormat(value.NewRecovered)}</p>
      </div>
    </div>
  </div>
);


CountryInfo.propTypes = {
  value: PropTypes.shape({
    Country: PropTypes.string,
    TotalConfirmed: PropTypes.number,
    TotalDeaths: PropTypes.number,
    TotalRecovered: PropTypes.number,
    NewConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
  }).isRequired,
};


export default CountryInfo;
