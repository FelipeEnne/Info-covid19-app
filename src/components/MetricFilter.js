import React from 'react';
import PropTypes from 'prop-types';

const MetricFilter = ({ options, onChange, value }) => (
  <div className="form-group filter">
    <h3>Filter:</h3>
    <select onChange={onChange} value={value} className="form-control">
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

MetricFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MetricFilter;
