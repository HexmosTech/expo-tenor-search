module.exports = function (Credentials, Utilities, Limit, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Endpoint = `${Credentials.Gate}/featured?key=${Credentials.Key}&limit=${Limit}&contentfilter=${Credentials.Filter}&locale=${Credentials.Locale}&media_filter=${Credentials.MediaFilter}`;

		Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
	});
};