import React from 'react';
import PropTypes from 'prop-types';

const SummaryInfo = ({ TotalConfirmed, TotalDeaths, TotalRecovered }) => (
  <tbody>
    <tr>
      <td>{TotalConfirmed}</td>
      <td>{TotalDeaths}</td>
      <td>{TotalRecovered}</td>
    </tr>
  </tbody>
);


SummaryInfo.propTypes = {
  TotalConfirmed: PropTypes.string.isRequired,
  TotalDeaths: PropTypes.string.isRequired,
  TotalRecovered: PropTypes.string.isRequired,
};


export default SummaryInfo;
