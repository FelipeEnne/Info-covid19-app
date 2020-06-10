import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import fetchSummary from '../actions/fechSummary';
import {
  getProductsError,
  getProductsLoading,
  getProducts,
  returnData,
  capitalize,
} from '../helper/helpers';
import selectCountry from '../actions/selectCountry';
import CountryInfo from '../components/CountryInfo';
import FooterApp from '../components/FooterApp';
import Loading from '../components/loading';


const SeachCountry = props => {
  // console.log(props);
  const {
    fetchSummary,
    loading,
    resp,
    date,
    selectCountry,
    country,
  } = props;

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  let c;

  const handleClick = () => {
    const t = capitalize(document.getElementById('nameCountry').value);
    if (t !== '') {
      c = resp.find(e => e.Country === t);
      if (c === undefined) {
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
    dataCountries = resp;
    if (dataCountries === undefined) return false;
    data = returnData(date);
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }


  if (country[0].country !== undefined) {
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
          <CountryInfo value={country[0].country} />
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
  resp: PropTypes.arrayOf(object).isRequired,
  date: PropTypes.string.isRequired,
  country: PropTypes.arrayOf(object).isRequired,
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
  resp: getProducts(state.summary).Countries,
  date: getProducts(state.summary).Date,
  country: [state.country],
});

export default connect(mapStateToProps, mapDispatchToProps)(SeachCountry);
