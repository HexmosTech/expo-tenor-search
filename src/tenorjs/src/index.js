import React from 'react';
import PropTypes from 'prop-types';
const Utilities = require('./Tools/Utilities');
const Trending = require('./Methods/Trending');
const Categories = require('./Methods/Categories');
const Search = require('./Methods/Search');



function TenorJS({ Credentials }) {

  const trending = Trending(Credentials, Utilities);
  const categories = Categories(Credentials, Utilities)
  const search = Search(Credentials, Utilities)

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