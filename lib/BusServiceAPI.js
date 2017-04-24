const request = require('request');

class BusServiceAPI {

	constructor(apiKey, options) {
		if (!apiKey || typeof apiKey !== 'string') throw new TypeError('API Key must be a string!');
		this.apiKey = apiKey;
		this.options = Object.assign({
			requester: this.getData.bind(this)
		}, options || {});
	}

	getBusServicesOperatingNow(callback) {
		var allServices = [],
			currentPage = -1;
		function done() {
			callback(allServices);
		}
		var loop = (page) => {
			this.getBusServices(++currentPage, services => {
				if (services.length !== 0) {
					allServices = allServices.concat(services);
					loop(currentPage);
				} else done();
			});
		}
		loop(0);
	}

	getBusServices(page, callback) {
		this.options.requester(page, payload => {
			var services = payload.value;
			callback(services.map(e => {return {
				serviceNo: e.ServiceNo,
				operator: e.Operator,
				serviceType: e.Category
			}}));
		});
	}

	getData(page, callback) {
		request({
			url: `http://datamall2.mytransport.sg/ltaodataservice/BusServices?\$skip=${page*50}`,
			headers: {
				'AccountKey': this.apiKey
			}
		}, (err, res) => {
			callback(JSON.parse(res.body));
		});
	}

}

module.exports = BusServiceAPI;
