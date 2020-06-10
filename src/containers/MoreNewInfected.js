import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  sortNewConfirmed,
  getTenArray,
  makeid,
  returnData,
} from '../helper/helpers';
import CountryNewTag from '../components/CountryNewTag';
import FooterApp from '../components/FooterApp';
import Loading from '../components/loading';


const MoreNewInfected = props => {
  // console.log(props);
  const {
    fetchSummary,
    loading,
    resp,
    date,
  } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let dataCountries = {};
  let dataLength = 0;
  let dataTenCountries = [];
  let data = '';

  const shouldComponentRender = () => {
    if (loading === true || resp === {}) return false;
    dataCountries = resp;
    if (dataCountries === undefined) return false;
    sortNewConfirmed(dataCountries);
    dataLength = dataCountries.length - 1;
    data = returnData(date);
    dataTenCountries = getTenArray(dataCountries, dataLength);
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  return (
    <div>
      <div className="divCateg">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Country</th>
              <th scope="col">New Confirmed</th>
              <th scope="col">New Deaths</th>
              <th scope="col">New Recovered</th>
            </tr>
          </thead>
          {dataTenCountries.map(value => (
            <CountryNewTag key={makeid(5)} value={value} />
          ))}
        </table>
      </div>
      <FooterApp value={data} />
    </div>
  );
};


MoreNewInfected.propTypes = {
  loading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  resp: PropTypes.arrayOf(object).isRequired,
  fetchSummary: PropTypes.instanceOf(Function).isRequired,
};

const mapDispatchToProps = () => ({
  fetchSummary,
});


const mapStateToProps = state => ({
  error: getProductsError(state.summary),
  loading: getProductsLoading(state.summary),
  resp: getProducts(state.summary).Countries,
  date: getProducts(state.summary).Date,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreNewInfected);
