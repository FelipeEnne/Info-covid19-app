import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchSummary from '../../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  returnData,
} from '../helpers';
import selectCountry from '../../actions/selectCountry';
import CountryInfo from './CountryInfo';
import FooterApp from '../FooterApp';


const SeachCountry = props => {
  const {
    fetchSummary,
    loading,
    resp,
    selectCountry,
    country,
  } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let c;

  const handleClick = () => {
    const t = document.getElementById('nameCountry').value;
    if (t !== '') {
      c = resp.Countries.find(e => e.Country === t);
      if (caches === undefined) {
        // eslint-disable-next-line no-console
        console.error('Your country was not found');
      }
      selectCountry(c);
    } else {
      // eslint-disable-next-line no-console
      console.error('Is empty');
    }
  };

  let dataCountries = {};
  let data = '';

  const shouldComponentRender = () => {
    if (loading === true || resp === {}) return false;
    dataCountries = resp.Countries;
    if (dataCountries === undefined) return false;
    data = returnData(resp.Date);
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


  if (country.country !== undefined) {
    return (
      <div>
        <div className="searchCountry">
          <form>
            <div className="form-group">
              <label htmlFor="nameCountry">
                Put the name of your country:
                <input className="form-control" type="text" id="nameCountry" name="nameCountry" />
              </label>
              <input type="button" className="btn btn-primary" value="Submit" onClick={handleClick} />
            </div>
          </form>
        </div>
        <div className="container">
          <CountryInfo value={country.country} />
        </div>
        <FooterApp value={data} />
      </div>
    );
  }

  return (
    <div>
      <div className="searchCountry">
        <form>
          <div className="form-group">
            <label htmlFor="nameCountry">
              Put the name of your country:
              <input className="form-control" type="text" id="nameCountry" name="nameCountry" />
            </label>
            <input type="button" className="btn btn-primary" value="Submit" onClick={handleClick} />
          </div>
        </form>
      </div>
      <FooterApp value={data} />
    </div>
  );
};


SeachCountry.propTypes = {
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resp: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  country: PropTypes.object.isRequired,
  fetchSummary: PropTypes.instanceOf(Function).isRequired,
  selectCountry: PropTypes.instanceOf(Function).isRequired,
};


const mapDispatchToProps = dispatch => ({
  selectCountry: country => dispatch(selectCountry(country)),
  fetchSummary,
});


const mapStateToProps = state => ({
  error: getProductsError(state.summary),
  loading: getProductsLoading(state.summary),
  resp: getProducts(state.summary),
  country: state.country,
});

export default connect(mapStateToProps, mapDispatchToProps)(SeachCountry);
