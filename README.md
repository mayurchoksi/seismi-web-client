# The solution/application is a web application that vizualizes earthquake occurrences. The solution consists of 2 artefacts:
* A client side web application
* A server side (nodejs based) module (it is rather just one function that talks to the RESTful data source)

## Client side web application

The client side application is an angularjs web application configured to be hosted on NodeJs. 
(**Note**: The application can be hosted on any Web Server but would need additional setup steps before it can be hosted.)

Following tools/modules were used:

* Angular JS - Javascript MVW Framework
* Foundation Framework - A responsive web Framework
* Jasmine - TDD framework used for Unit Testing
* Karma - Unit Test Runner
* Protractor - Used for end2end/Integration Testing

## Server side module
The server side module is used for requesting data from the Seismi RESTful data source. 
There were 3 reasons to move the interaction with the RESTful webservice from the client application to the server application/module:

* To cache responses recieved from the RESTful datasource to reduce unnecessary requests for data. 
(**Note:** Caching is also implemented in the client application but is only cached for a particular user and is done particularly to make the site responsive and hence better user experience.

* To decouple the client application from the actual datasource
* To enable CORS

Following tools/modules were used:

* NodeJS - Javascript based runtime/server
* Express - Web framework for nodejs
* node-cache - Node package for caching
* cors - Node package for enabling cors (Cross Origin Resource Sharing) 

NPM was used as the Package Manager and Bower was used for dependency (libraries) management.

## Install

### Prerequisites
NodeJS installed. If not installed it can be installed from (http://nodejs.org/)

Chrome installed. Chrome is configured to be used for Unit and end to end testing. If Chrome is not installed and Firefox is then update the following 2 files to use Firefox for testing instead:
```
seismi-web-client/karma.conf.js
seismi-web-client/protractor.conf.js
```

Once NodeJs is installed follow the below steps:
```
git clone https://github.com/mayurchoksi/seismi-web-client.git
cd seismi-web-client
npm install
```

## Run the application
```
npm start
```
Open http://localhost:5000 in a web browser

# Design Consideration
## Design Patterns
AngularJS embraces the following design patters and hence is inbuilt when used

* Dependency Injection
* Controllers (MVC or MVW (Model View Whatever))
* Singleton
* Facade

## Reusability
* The Earthquake datasource can be modified by updating the Datasource URL in only one location.
* The solution can be reused as a skeleton for any other similar solutions.
* The solution can be deployed to and Platform (OS/Hardware) as along as NodeJS exists for that Platform.

## Development Process
Sublime text with AngularJs plugin was used for development. Was continously integrated and automatically tested on NodeJS running locally (using Karma, Protractor and node packages like express, connect, and cors among others.). Chrome and Firefox was used for testing during development. OS Used: Linix.

## Quality Control and Assurance
### Formatting and Validation
Sublime text along with a few plugins (HTMLPrettify, jshint, csslint among others) was used to format and validate html, js and css files.

### Unit Testing
Jasmine has been used to write unit tests. Karma has been used for running the tests. Karma can run continously and hence pick any changes made to the source and rerun the tests. Karma can be run using the following commands:

```
cd seismi-web-client
npm test
```
### Integration/end to end Testing
Protractor has been used to implement end to end tests. Protractor can be run as follows:
Run the application (the application should be running for protractor to run any end to end tests)

```
cd seismi-web-client
npm start
```

Open another terminal and run the following commands to start e2e testing

```
cd seismi-web-client
npm run protractor
```

Tested on Linux(Ubuntu) and Windows 7.

**Note:** Not tested but should work as is on OSx or any other Linux flavours.

## Further improvements that can be done:
* Async Javascript loading
* UX improvments (CSS improvements, Include animations for the charts used, etc)
* Additional end to end test scenarios
* Configure Protractor for end to end tests on IE, Safari and Opera. 
* Separate the client and the server applications so that they can be used individually if need be. 

## Errors to look out for:
```
Error: listen EADDRINUSE
    at errnoException (net.js:901:11)
```

Verfiy that the application is not already up/running.

### Application hosted on Heroku for a quick preview: (https://seismic-web-client.herokuapp.com)