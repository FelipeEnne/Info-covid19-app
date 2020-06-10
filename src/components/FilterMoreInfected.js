import React from 'react';
import PropTypes from 'prop-types';
import { makeid } from '../helper/helpers';


const FilterMoreInfected = ({ onChange, value }) => {
  const filter = ['Total Confirmed', 'Total Deaths', 'Total Recovered'];
  return (
    <div className="form-group filter">
      <h3>Filter:</h3>
      <select onChange={onChange} value={value} className="form-control">
        {filter.map(e => <option key={makeid(5)} value={e}>{e}</option>)}
      </select>
    </div>
  );
};

FilterMoreInfected.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterMoreInfected;
