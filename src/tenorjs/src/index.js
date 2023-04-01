import React from 'react';
import PropTypes from 'prop-types';
import Utilities from './Tools/Utilities';
import Trending from './Methods/Trending';
import Categories from './Methods/Categories';
import Search from './Methods/Search';


function TenorJS({ Credentials }) {


  const trending = Trending(Credentials, Utilities);
  const categories = Categories(Credentials, Utilities)
  const search = Search(Credentials, Utilities)
  // const 

  return { trending, categories, search };
}

TenorJS.propTypes = {
  Credentials: PropTypes.shape({
    Key: PropTypes.string.isRequired,
    Locale: PropTypes.string.isRequired,
    Filter: PropTypes.oneOf(['off', 'low', 'medium', 'high']).isRequired,
    DateFormat: PropTypes.string,
  }).isRequired,
};

export default TenorJS;