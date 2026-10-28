import React from 'react';
import MetricFilter from './MetricFilter';

const OPTIONS = ['Total Confirmed', 'Total Deaths', 'Total Recovered'];

const FilterMoreInfected = props => <MetricFilter options={OPTIONS} {...props} />;

export default FilterMoreInfected;
