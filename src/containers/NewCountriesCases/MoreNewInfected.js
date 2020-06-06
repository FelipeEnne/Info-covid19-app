import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchSummary from '../../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  sortNewConfirmed,
  getTenArray,
  makeid,
  returnData,
} from '../Helper/helpers';
import CountryNewTag from './CountryNewTag';
import FooterApp from '../Footer/FooterApp';

const MoreNewInfected = props => {
  // console.log(props);
  const { fetchSummary, loading, resp } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let dataCountries = {};
  let dataLength = 0;
  let dataTenCountries = [];
  let data = '';

  const shouldComponentRender = () => {
    if (loading === true || resp === {}) return false;
    dataCountries = resp.Countries;
    if (dataCountries === undefined) return false;
    sortNewConfirmed(dataCountries);
    dataLength = dataCountries.length - 1;
    data = returnData(resp.Date);
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
          <CountryNewTag key={makeid(5)} value={value} />
        ))}
      </div>
      <FooterApp value={data} />
    </div>
  );
};


MoreNewInfected.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreNewInfected);
