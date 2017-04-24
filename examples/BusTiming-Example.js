const BusTimingAPI = require('..').BusTimingAPI,
	prettySeconds = require('pretty-seconds');

var api = new BusTimingAPI(require('./read-config')());

api.getTimingForStop(process.argv[2] || (()=>{throw new TypeError('Please provide a bus stop code.')})(), busStop => {
	for (let service in busStop.timings) 
		if (busStop.timings[service].avaliableBuses) {
			console.log(`Service ${service}`);
			for (let bus of busStop.timings[service].buses) {
				var timeToArrival = (bus.arrival - +new Date()) / 1000;
				if (timeToArrival > 0)
					console.log(`  The bus is arriving in ${prettySeconds((bus.arrival - +new Date()) / 1000)}`);
				else
					console.log('  The bus has arrived.');
			}
		}
});
