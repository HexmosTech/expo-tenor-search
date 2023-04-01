import GIFs  from './Trending/GIFs';
import Terms from './Trending/Terms';

export default function (Credentials, Utilities) {
    const Methods = {};

    Methods.GIFs = function (Limit, Callback) {
        return GIFs(Credentials, Utilities, Limit, Callback);
    };

    Methods.Terms = function (Callback) {
        return Terms(Credentials, Utilities, Callback);
    };

    return Methods;
};