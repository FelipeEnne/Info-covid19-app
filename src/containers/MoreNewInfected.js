import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsLoading,
  getProducts,
  sortNewConfirmed,
  sortNewDeaths,
  sortNewRecovered,
  getTenArray,
  returnData,
} from '../helper/helpers';
import CountryNewTag from '../components/CountryNewTag';
import FooterApp from '../components/FooterApp';
import Loading from '../components/loading';
import FilterNewInfected from '../components/FilterNewInfected';
import updateFilter from '../actions/updateFilter';

const MoreNewInfected = props => {
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
    if (loading === true || resp === {}) return false;

    if (resp === undefined) return false;
    let sortedResp;
    switch (filter) {
      case 'New Confirmed':
        sortedResp = sortNewConfirmed(resp);
        break;
      case 'New Deaths':
        sortedResp = sortNewDeaths(resp);
        break;
      case 'New Recovered':
        sortedResp = sortNewRecovered(resp);
        break;
      default:
        sortedResp = sortNewConfirmed(resp);
    }
    dataTenCountries = getTenArray(sortedResp, dataLength);
    data = returnData(date);
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  const handleFilterChange = e => {
    addFilter(e.target.value);
  };

  return (
    <div>
      <FilterNewInfected onChange={handleFilterChange} value={filter} />
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
            <CountryNewTag key={value.Country} value={value} />
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
  filter: PropTypes.string.isRequired,
  addFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addFilter: filter => dispatch(updateFilter(filter)),
  fetchSummary,
});


const mapStateToProps = state => ({
  loading: getProductsLoading(state.summary),
  resp: getProducts(state.summary).Countries,
  date: getProducts(state.summary).Date,
  filter: state.filter.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreNewInfected);
