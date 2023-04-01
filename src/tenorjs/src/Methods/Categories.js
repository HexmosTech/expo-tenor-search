// import findCategories from "./Categories/Find";
import listTags from "./Categories/Tags";
import findCategories from "./Categories/Find"

export default function (Credentials, Utilities) {
  const Methods = {};

  Methods.Find = function (Tag, Limit, Callback) {
    return findCategories(Credentials, Utilities, Tag, Limit, Callback);
  };

  Methods.List = function (Type, Callback) {
    return listTags(Credentials, Utilities, Type, Callback);
  };

  return Methods;
};

