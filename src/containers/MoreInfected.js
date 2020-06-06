import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  sortTotalConfirmed,
  getTenArray,
  makeid,
} from './helpers';
import CountryTag from './countryTag';

const MoreInfected = props => {
  const { fetchSummary, loading, resp } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let dataCountries = {};
  let dataLength = 0;
  let dataTenCountries = [];

  const shouldComponentRender = () => {
    if (loading === true || resp === {}) return false;
    dataCountries = resp.Countries;
    if (dataCountries === undefined) return false;
    sortTotalConfirmed(dataCountries);
    dataLength = dataCountries.length - 1;
    dataTenCountries = getTenArray(dataCountries, dataLength);
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
    <div>
      <div className="categlInfo container">
        {dataTenCountries.map(value => (
          <CountryTag key={makeid(5)} value={value} />
        ))}
      </div>
    </div>
  );
};


MoreInfected.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfected);
