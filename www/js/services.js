// The SeismicService is used to interact with the DataSource (though the server module)
app.service('SeismicService', ['$resource',
    function($resource) {
        this.getEqs = function(year, month, minMagnitude, success) {
            getResourse = function(year, month, minMagnitude) {
                var urlSuffix = "";
                if (year && !angular.equals(year, '')) {
                    urlSuffix = urlSuffix + year;

                    if (month && !angular.equals(month, '')) {
                        urlSuffix = urlSuffix + '/' + month;
                    }
                }
                if (minMagnitude && !angular.equals(minMagnitude, '')) {
                    urlSuffix = urlSuffix + '?min_magnitude=' + minMagnitude;
                }

                console.log("Requesting resource: " + '/eqs/' + urlSuffix)
                return '/eqs/' + urlSuffix;
            }

            var reourceUrl = getResourse(year, month, minMagnitude);

            //get resource from local storage if present. Get it from the service otherwise.
            if (localStorage.getItem(reourceUrl)) {
                console.log("Serving data from client/browser cache..");
                success(JSON.parse(localStorage.getItem(reourceUrl)));
            } else {
                var eqsResource = $resource(reourceUrl);
                eqsResource.get().$promise.then(function(eqs) {
                    console.log("Serving data from service..");
                    success(eqs);
                    localStorage.setItem(reourceUrl, JSON.stringify(eqs));
                }, function(errResponse) {
                    console.error("Error occurred while retrieving earthquake data.");
                });
            }
        };
    }
]);
