import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../helpers';

const CountryInfo = ({ value }) => (
  <div>
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Total Confirmed</th>
          <th scope="col">Total Deaths</th>
          <th scope="col">Total Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{numberFormat(value.TotalConfirmed)}</td>
          <td>{numberFormat(value.TotalDeaths)}</td>
          <td>{numberFormat(value.TotalConfirmed)}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">New Confirmed</th>
          <th scope="col">New Deaths</th>
          <th scope="col">New Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{numberFormat(value.NewConfirmed)}</td>
          <td>{numberFormat(value.NewDeaths)}</td>
          <td>{numberFormat(value.NewRecovered)}</td>
        </tr>
      </tbody>
    </table>
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
