module.exports = function (Credentials, Utilities, Type, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/categories?key=${Credentials.Key}&locale=${Credentials.Locale}&type=${Type}&contentfilter=${Credentials.Filter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};