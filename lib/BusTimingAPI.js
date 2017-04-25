const request = require('request');

class BusTimingAPI {

	constructor(apiKey, options) {
		if (!apiKey || typeof apiKey !== 'string') throw new TypeError('API Key must be a string!');
		this.apiKey = apiKey;
		this.options = Object.assign({
			requester: null
		}, options || {});
	}

	getTimingForStop(busStop, callback) {
		this.getData(busStop, payload => {
			payload = payload.Services;
			callback({
				services: payload.map(service => service.ServiceNo),
				timings: payload.reduce((timings, service) => {
					function timingObj(service, type) {
						var arrival = new Date(service[type].EstimatedArrival);
						return {
							arrival: arrival,
							secondsToArrival: Math.max(0, (arrival - +new Date()) / 1000),
							load: service[type].Load,
							isWAB: service[type].Feature === 'WAB'
                        };
					}
					var types = ['NextBus', 'SubsequentBus', 'SubsequentBus3'];
					timings[service.ServiceNo] = {
						avaliableBuses: service.NextBus.EstimatedArrival === '' ? 0 : service.SubsequentBus.EstimatedArrival === '' ? 1 : service.SubsequentBus3.EstimatedArrival === '' ? 2 : 3,
						buses: []
					};
					for (var i = 0; i < timings[service.ServiceNo].avaliableBuses; i++) {
						timings[service.ServiceNo].buses.push(timingObj(service, types[i]))
					}
					return timings;
				}, {})
			});
		});
	}

	getData(busStop, callback) {
		if (this.options.requester) this.options.requester(busStop, callback);
		else
			request({
				url: `http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID=${busStop}&SST=True`,
				headers: {
					'AccountKey': this.apiKey
				}
			}, (err, res) => {
					callback(JSON.parse(res.body));
			});
	}

}

module.exports = BusTimingAPI;
