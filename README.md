
# Serverless example with Node and AWS

Serverless computing is an execution model in which the provider in the cloud (AWS, Google Cloud or Azure) is responsible for executing a piece of code by dynamically allocating resources. And charging only for the amount of resources used to execute the code. The code, generically, sits inside stateless containers that can be triggered by a variety of events.

Cloud providers have many ways to call a lambda in this case we will use an API Gateway that acts as a balancer and determines the functionality to be executed (routing). 

`API Gateway => Lambda Function => DynameDB`

In short, lambdas functions can be compared to our controllers and gateways to routers. 

The different backend frameworks (express and others) differ in that they execute the functionality in a monolith and run in a single thread, in serverless the functionality is divided into completely decoupled modules, which allows us for example to deploy a single module.

## Advantages:

- No server maintenance is required.
- You only pay for the execution time.
- You can scale easier with 99.9% SLA.
- Better log system.

## Is it the same as microservices?

It is not the same, but it is often related. Microservices is a type of architecture that aims to break (⚔🥌) the application into different parts that fulfil a specific function. 

Serverless may be a way in which this can be done, but it is only on the execution side. Because its main feature is the above mentioned: **calls on demand (our container is off if not used)**.

## What do we need?

- Node.js
- Serverless framework (code as infrastructure).
- AWS credentials.

## Serverless function

```
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
```

## Serverles YML

Care with syntax

```
service: node-aws-test

provider:
  name: aws
  stage: development
  runtime: nodejs12.x
  timeout: 10
  memory: 128


functions:
  helloWorld:
    handler: index.helloWorld
    description: Hello world function
    environment:
      ENV: development
    events:
      - http:
          path: /{name}
          method: GET
          cors: true
  sum:
    handler: index.sum
    description: Sum function
    events:
      - http:
          path: /suma
          method: POST
          cors: true
          private: true

plugins:
  - serverless-offline
```

## Layers

Allows us to cache or share files between the different lambdas we have. It is useful for handling very large files that are not updated very often.