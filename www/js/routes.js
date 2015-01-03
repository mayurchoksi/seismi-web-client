app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/dashboard.html'
        })
        .when('/list', {
            templateUrl: 'partials/list.html'
        })
        .when('/markerMap', {
            templateUrl: 'partials/markerMap.html'
        })
        .when('/bubbleChart', {
            templateUrl: 'partials/bubbleChart.html'
        })
});
