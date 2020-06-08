import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchSummary from '../../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  numberFormat,
} from '../Helper/helpers';

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
    if (loading === true || resp === {}) return false;
    dataGlobal = resp.Global;
    if (dataGlobal === undefined) return false;
    TotalConfirmed = numberFormat(dataGlobal.TotalConfirmed);
    TotalDeaths = numberFormat(dataGlobal.TotalDeaths);
    TotalRecovered = numberFormat(dataGlobal.TotalRecovered);
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
            <h5>Total Confirmed: </h5>
            <p>{TotalConfirmed}</p>
          </div>
        </div>
        <div className="Infodiv  col">
          <div>
            <h5>Total Deaths: </h5>
            <p>{TotalDeaths}</p>
          </div>
        </div>
        <div className="Infodiv  col">
          <div>
            <h5>Total Recovered: </h5>
            <p>{TotalRecovered}</p>
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
