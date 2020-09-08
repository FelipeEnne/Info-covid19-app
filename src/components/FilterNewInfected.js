import React from 'react';
import PropTypes from 'prop-types';
import { makeid } from '../helper/helpers';


const FilterNewInfected = ({ onChange, value }) => {
  const filter = ['New Confirmed', 'New Deaths', 'New Recovered'];
  return (
    <div className="form-group filter">
      <h3>Filter:</h3>
      <select onChange={onChange} value={value} className="form-control">
        {filter.map(e => <option key={makeid(5)} value={e}>{e}</option>)}
      </select>
    </div>
  );
};

FilterNewInfected.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterNewInfected;
