import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../Helper/helpers';

const CountryTag = ({ value }) => (
  <tbody>
    <tr>
      <td>{value.Country}</td>
      <td>{numberFormat(value.TotalConfirmed)}</td>
      <td>{numberFormat(value.TotalDeaths)}</td>
      <td>{numberFormat(value.TotalConfirmed)}</td>
    </tr>
  </tbody>
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
