/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

step.stopTrackingShipEngine = function (inputs) {

	var inputsLogic = {
		params:{
			carrier_code:inputs.carrierCode || "",
			tracking_number:inputs.trackingNumber || ""
		} || []
	};

	var options = {
		path: "/tracking/stop",
		params: inputsLogic.params,
	}

	options= setApiUri(options);
	options= setRequestHeaders(options);

	return httpService.get(options);
}

function setApiUri(options) {
	var url = options.path || "";
	options.url = config.get("SHIPENGINE_API_BASE_URL") + url;
	sys.logs.debug('[shipengine] Set url: ' + options.path + "->" + options.url);
	return options;
}

function setRequestHeaders(options) {
	var headers = options.headers || {};
	sys.logs.debug('[shipengine] Set header apikey');
	headers = mergeJSON(headers, {"API-Key": config.get("apiToken")});
	headers = mergeJSON(headers, {"Content-Type": "application/json"});

	options.headers = headers;
	return options;
}

function mergeJSON (json1, json2) {
	var result = {};
	var key;
	for (key in json1) {
		if(json1.hasOwnProperty(key)) result[key] = json1[key];
	}
	for (key in json2) {
		if(json2.hasOwnProperty(key)) result[key] = json2[key];
	}
	return result;
}
