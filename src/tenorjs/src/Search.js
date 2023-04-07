// import Find from './Search/Find';
// import Query from './Search/Query';
// import Random from './Search/Random';

const Find = require('./Methods/Search/Find');
const Query = require('./Methods/Search/Query');
const Random = require('./Methods/Search/Random');

export default function Search(Credentials, Utilities) {
  const Methods = {};

  Methods.Find = function (IDs, Callback) {
    return Find(Credentials, Utilities, IDs, Callback);
  };

  Methods.Query = function (Term, Limit, Callback) {
    return Query(Credentials, Utilities, Term, Limit, Callback);
  };

  Methods.Random = function (Key, Limit, Callback) {
    return Random(Credentials, Utilities, Key, Limit, Callback);
  };

  return Methods;
};