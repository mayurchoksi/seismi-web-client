var express = require('express');
var cors = require('cors');
var http = require('http');
var NodeCache = require("node-cache");

var app = express();

//TTL set to 1 hr. The cache will be checked every 2 minutes. Any statle data will be deleted.
var myCache = new NodeCache({
    stdTTL: 3600,
    checkperiod: 120
});

app.set('port', (process.env.PORT || 5000));

// In production mode the * should be relaced with the appropriate domain name(s)
// (e.g. https://seismic-web-client.herokuapp.com if the client web app is hosted on https://seismic-web-client.herokuapp.com)
app.options('*', cors());
app.use(cors());

// Requests other than seismic data requests are serviced (statically) by the web app (from folder www)
app.use(express.static(__dirname + '/www'));
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

// all requests for sesimic data is routed through the nodejs application.
app.get('/eqs*', function(request, response, next) {
    var responseData = "";
    var options = {
        host: 'www.seismi.org',
        path: '/api' + request.url
    };

    respondWithData = function(responseDataObj) {
        response.send(responseDataObj);
    }

    callback = function(response) {
        var responseData = '';

        response.on('data', function(chunk) {
            responseData += chunk;
        });

        response.on('end', function() {
            myCache.set(request.url, responseData);
            respondWithData(responseData);
        });
    }

    //Get data from cache if already cached. Request from Service otherwise.
    if (Object.keys(myCache.get(request.url)).length > 0) {
        console.log("Cache hit. Request for " , request.url, " retrieved from server cache.");
        respondWithData(myCache.get(request.url)[request.url]);
    } else {
        console.log("Cache miss. Request for " , request.url, " retrieved from service/datasource.");
        http.request(options, callback).end();
    }
});
