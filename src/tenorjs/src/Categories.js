// import findCategories from "./Categories/Find";
// import listTags from "./Categories/Tags";
// import findCategories from "./Categories/Find"
const listTags = require('./Methods/Categories/Tags')
const findCategories = require('./Methods/Categories/Find')

module.exports = function (Credentials, Utilities) {
  const Methods = {};

  Methods.Find = function (Tag, Limit, Callback) {
    return findCategories(Credentials, Utilities, Tag, Limit, Callback);
  };

  Methods.List = function (Type, Callback) {
    return listTags(Credentials, Utilities, Type, Callback);
  };

  return Methods;
};

