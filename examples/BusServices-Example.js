const BusServiceAPI = require('..').BusServiceAPI,
	prettySeconds = require('pretty-seconds');

var api = new BusServiceAPI(require('./read-config')());

api.getBusServicesOperatingNow(services => {
	for (let service of services)
		console.log(`Service ${service.serviceNo} is operating now under ${service.operator} on direction ${service.direction}`);
});
