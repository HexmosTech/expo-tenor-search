// import Utilities from './src/Tools/Utilities';
// import TenorJS from './src';

// const Utilities = require('./src/Tools/Utilities')
const TenorJS  = require('./src')

const Filters = ['off', 'low', 'medium', 'high'];
const MediaFilters = ['gif', 'mp4', 'nanomp4', 'nanogif', 'tinymp4', 'tinygif'];

exports.client = function (Credentials)
{
      const Filters      = ["off", "low", "medium", "high"],
            MediaFilters = ["gif", "mp4", "nanomp4", "nanogif", "tinymp4", "tinygif"];

      if (!Credentials.Key || !Credentials.Locale || !Credentials.Filter)
      {
            throw new Error ("Client configuration is not complete; please ensure all configuration parameters are satisfied (Key, Locale, Filter).");
      }

      if (!Credentials.DateFormat) Credentials.DateFormat = "D/MM/YYYY - H:mm:ss A";

      if (!Filters.includes(Credentials.Filter.toLowerCase())) throw new Error ("Content filter level has to be one of these options: off, low, medium, high.");

      Credentials.Gate   = "https://tenor.googleapis.com/v2";
      Credentials.Filter = Credentials.Filter.toLowerCase();
      
      return TenorJS({ Credentials });
};