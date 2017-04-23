const BusTimingAPI = require('..').BusTimingAPI,
	prettySeconds = require('pretty-seconds');

var api = new BusTimingAPI('N55kHDJjR5WeyjqxWkYjsg==');

api.getTimingForStop(process.argv[2] || (()=>{throw new TypeError('Please provide a bus stop code.')})(), busStop => {
	for (let service in busStop.timings) 
		if (busStop.timings[service].avaliableBuses) {
			console.log(`Service ${service}`);
			for (let bus of busStop.timings[service].buses)
				console.log(`  The bus is arriving in ${prettySeconds((bus.arrival - +new Date()) / 1000)}`);
		}
});
