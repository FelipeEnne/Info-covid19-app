import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  numberFormat,
} from './helpers';

const Summary = props => {
  const { fetchSummary, loading, resp } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let dataGlobal = {};
  let TotalConfirmed;
  let TotalDeaths;
  let TotalRecovered;

  const shouldComponentRender = () => {
    console.log(props);
    if (resp !== undefined) {
      if (loading === true || resp === {}) return false;
      dataGlobal = resp.Global;
      if (dataGlobal === undefined) return false;
      TotalConfirmed = numberFormat(dataGlobal.TotalConfirmed);
      TotalDeaths = numberFormat(dataGlobal.TotalDeaths);
      TotalRecovered = numberFormat(dataGlobal.TotalRecovered);
      return true;
    }
  };

  const loadDiv = () => (
    <div>
      Loading ...
    </div>
  );

  if (!shouldComponentRender()) {
    return loadDiv;
  }

  return (
    <div className="container">
      <div className="geralInfo row">
        <div className="Infodiv">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Total Confirmed</th>
                <th scope="col">Total Deaths</th>
                <th scope="col">Total Recovered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{TotalConfirmed}</td>
                <td>{TotalDeaths}</td>
                <td>{TotalRecovered}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


Summary.propTypes = {
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resp: PropTypes.object.isRequired,
  fetchSummary: PropTypes.instanceOf(Function).isRequired,
};

const mapDispatchToProps = {
  fetchSummary,
};


const mapStateToProps = state => {
  const { summary } = state;
  return (
    {
      error: getProductsError(summary),
      loading: getProductsLoading(summary),
      resp: getProducts(summary),
    }
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
