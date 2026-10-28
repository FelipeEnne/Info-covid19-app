import React from 'react';
import MetricFilter from './MetricFilter';

const OPTIONS = ['New Confirmed', 'New Deaths', 'New Recovered'];

const FilterNewInfected = props => <MetricFilter options={OPTIONS} {...props} />;

export default FilterNewInfected;
