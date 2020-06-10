import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  sortTotalConfirmed,
  getTenArray,
  makeid,
  returnData,
} from '../helper/helpers';
import CountryTag from '../components/CountryTag';
import FooterApp from '../components/FooterApp';
import Loading from '../components/loading';


const MoreInfected = props => {
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

  let dataCountries;
  let dataLength = 0;
  let dataTenCountries = [];
  let data = '';

  const shouldComponentRender = () => {
    if (loading === true || resp.length === 0) return false;
    dataCountries = resp;
    if (dataCountries === undefined) return false;
    sortTotalConfirmed(dataCountries);
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
              <th scope="col">Total Confirmed</th>
              <th scope="col">Total Deaths</th>
              <th scope="col">Total Recovered</th>
            </tr>
          </thead>
          {dataTenCountries.map(value => (
            <CountryTag key={makeid(5)} value={value} />
          ))}
        </table>
      </div>
      <FooterApp value={data} />
    </div>
  );
};


MoreInfected.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfected);
