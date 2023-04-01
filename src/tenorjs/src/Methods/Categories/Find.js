module.exports = function (Credentials, Utilities, Tag, Limit, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/search?key=${Credentials.Key}&tag=${Tag}&limit=${Limit}&locale=${Credentials.Locale}&contentfilter=${Credentials.Filter}&media_filter=${Credentials.MediaFilter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};
// TODO: fix this
// # [TenorJS] Could not send request @ https://tenor.googleapis.com/v2/search?key=AIzaSyAWrnLQu6Xu-4DcnzAVGyV-nDzc0xaClI4&tag=excited&limit=10&locale=en_US&contentfilter=off&media_filter=minimal - Status Code: 400