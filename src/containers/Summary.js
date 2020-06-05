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

  const shouldComponentRender = () => {
    if (loading === true || resp === {}) return false;
    dataGlobal = resp.Global;
    if (dataGlobal === undefined) return false;
    return true;
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
        <div className="Infodiv col">
          <div>
            <h5>New Confirmed: </h5>
            <p>{numberFormat(dataGlobal.NewConfirmed)}</p>
          </div>
          <div>
            <h5>Total Confirmed: </h5>
            <p>{numberFormat(dataGlobal.TotalConfirmed)}</p>
          </div>
        </div>
        <div className="Infodiv  col">
          <div>
            <h5>New Deaths: </h5>
            <p>{numberFormat(dataGlobal.NewDeaths)}</p>
          </div>
          <div>
            <h5>Total Deaths: </h5>
            <p>{numberFormat(dataGlobal.TotalDeaths)}</p>
          </div>
        </div>
        <div className="Infodiv  col">
          <div>
            <h5>New Recovered: </h5>
            <p>{numberFormat(dataGlobal.NewRecovered)}</p>
          </div>
          <div>
            <h5>Total Recovered: </h5>
            <p>{numberFormat(dataGlobal.TotalRecovered)}</p>
          </div>
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
