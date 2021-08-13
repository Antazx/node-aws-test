/**
 * @param {*} event information about the event that triggers the function if its an API it will contain body, headers, stringParams, pathParams ...
 * @param {*} context of the running function, not used often, time to time remaining to complete function if timeout
 * @param {*} callback sends the response
 */
const helloWorld = (event, context, callback) => {
	console.log(`I'm running on environment: ${process.env.ENV}`);
	console.log(`Event: ${event}`);
	console.log(`Hello ${event.pathParameters.name}`);
	const response = {
		statusCode: 200,
		body: JSON.stringify({ succes: true })
	};
	console.log(response);
	callback(null, response);
};

const sum = (event, context, callback) => {
	console.log(`Event: ${JSON.stringify(event)}`);
	const body = JSON.parse(event.body);
	const result = body.a + body.b;
	const response = {
		statusCode: 200,
		body: JSON.stringify({result})
	};
	console.log(response);
	callback(null, response);
}

module.exports = {
	helloWorld,
	sum
};
