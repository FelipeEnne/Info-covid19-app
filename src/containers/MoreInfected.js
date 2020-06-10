import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  sortTotalConfirmed,
  sortTotalDeaths,
  sortTotalRecovered,
  getTenArray,
  makeid,
  returnData,
} from '../helper/helpers';
import CountryTag from '../components/CountryTag';
import FooterApp from '../components/FooterApp';
import Loading from '../components/loading';
import FilterMoreInfected from '../components/FilterMoreInfected';
import updateFilter from '../actions/updateFilter';

const MoreInfected = props => {
  // console.log(props);
  const {
    fetchSummary,
    loading,
    resp,
    date,
    filter,
    addFilter,
  } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let dataTenCountries;
  const dataLength = resp.length - 1;
  let data = '';

  const shouldComponentRender = () => {
    if (loading === true || resp.length === 0) return false;
    if (resp === undefined) return false;
    switch (filter) {
      case 'Total Confirmed':
        sortTotalConfirmed(resp);
        break;
      case 'Total Deaths':
        sortTotalDeaths(resp);
        break;
      case 'Total Recovered':
        sortTotalRecovered(resp);
        break;
      default:
        sortTotalConfirmed(resp);
    }
    dataTenCountries = getTenArray(resp, dataLength);
    data = returnData(date);
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  const handleFilterChange = e => {
    addFilter(e.target.value);
    sortTotalDeaths(resp);
    dataTenCountries = getTenArray(resp, dataLength);
  };

  return (
    <div>
      <FilterMoreInfected onChange={handleFilterChange} value={filter} />
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
  addFilter: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  resp: PropTypes.arrayOf(object).isRequired,
  fetchSummary: PropTypes.instanceOf(Function).isRequired,
  filter: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addFilter: filter => dispatch(updateFilter(filter)),
  fetchSummary,
});

const mapStateToProps = state => ({
  error: getProductsError(state.summary),
  loading: getProductsLoading(state.summary),
  resp: getProducts(state.summary).Countries,
  date: getProducts(state.summary).Date,
  filter: state.filter.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfected);
