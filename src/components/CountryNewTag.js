import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../helper/helpers';

const CountryNewTag = ({ value }) => (
  <tbody>
    <tr>
      <td>{value.Country}</td>
      <td>{numberFormat(value.NewConfirmed)}</td>
      <td>{numberFormat(value.NewDeaths)}</td>
      <td>{numberFormat(value.NewRecovered)}</td>
    </tr>
  </tbody>
);


CountryNewTag.propTypes = {
  value: PropTypes.shape({
    Country: PropTypes.string,
    NewConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
  }).isRequired,
};


export default CountryNewTag;
