import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../Helper/helpers';

const CountryNewTag = ({ value }) => (
  <div className="divCateg row">
    <div className="col-sm">
      <h5>Country: </h5>
      <p>{value.Country}</p>
    </div>
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
