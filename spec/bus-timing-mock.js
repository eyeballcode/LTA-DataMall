module.exports = (stopID) => {
	var serviceList;

	switch(stopID) {
		case 49121: // Aft. SMRT Kranji Dpt, testing 925
			serviceList = [{
				ServiceNo: '925',
				NextBus: {
					EstimatedArrival: new Date(+new Date() + 5 * 60000).toISOString(),
					Load: 'Seats Avaliable',
					Feature: 'WAB'
				},
				SubsequentBus: {
					EstimatedArrival: '',
					Load: '',
					Feature: ''
				},
				SubsequentBus3: {
					EstimatedArrival: '',
					Load: '',
					Feature: ''
				}
			}];
	}

	return (busStop, callback) => {
		callback({
			Services: serviceList
		});
	};
};
