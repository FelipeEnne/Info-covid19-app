import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  numberFormat,
} from '../helper/helpers';
import SummaryInfo from '../components/SummaryInfo';
import Loading from '../components/loading';

const Summary = props => {
  const { fetchSummary, loading, resp } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const shouldComponentRender = () => {
    if (loading === true || resp.length === 0) return false;
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
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
            <SummaryInfo
              TotalConfirmed={numberFormat(resp[0].TotalConfirmed)}
              TotalDeaths={numberFormat(resp[0].TotalDeaths)}
              TotalRecovered={numberFormat(resp[0].TotalRecovered)}
            />
          </table>
        </div>
      </div>
    </div>
  );
};


Summary.propTypes = {
  loading: PropTypes.bool.isRequired,
  resp: PropTypes.arrayOf(object).isRequired,
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
      resp: [getProducts(summary).Global],
    }
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
