app.controller('GoogleChartsController', ['$scope', 'SeismicService',
    function($scope, SeismicService) {
        googleCharts = this;

        // method used to draw any chart
        this.drawChart = function(chartType, year, month, minMagnitude) {
            if (chartType) {
                if (angular.equals(chartType, 'BubbleChart')) {
                    googleCharts.drawBubbleChart(year, month, minMagnitude);
                } else if (angular.equals(chartType, 'GeoMarkerMap')) {
                    googleCharts.drawMarkerMap(year, month, minMagnitude);
                }
            }
        }

        // method used to draw the Geo Marker Map
        this.drawMarkerMap = function(year, month, minMagnitude) {
            SeismicService.getEqs(year, month, minMagnitude, function(seismicDataObj) {
                $scope.seismicEvents = seismicDataObj.earthquakes;
                var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                if (seismicDataObj.earthquakes && seismicDataObj.earthquakes.length > 0) {
                    var dataArr = [];
                    dataArr[0] = ['Latitude', 'Longitude', 'Depth', 'Magnitude'];
                    for (var i = 0; i < seismicDataObj.earthquakes.length; i++) {
                        dataArr[i + 1] = [parseInt(seismicDataObj.earthquakes[i].lat),
                            parseInt(seismicDataObj.earthquakes[i].lon),
                            parseInt(seismicDataObj.earthquakes[i].depth),
                            parseInt(seismicDataObj.earthquakes[i].magnitude)
                        ];
                    }

                    var mapRegion = 'world';
                    var data = google.visualization.arrayToDataTable(dataArr);
                    var options = {
                        region: mapRegion,
                        displayMode: 'markers',
                        colorAxis: {
                            colors: ['yellow', 'red']
                        },
                        animation: {
                            duration: 3000,
                            easing: 'out',
                        }
                    };


                    chart.draw(data, options);
                    google.visualization.events.addListener(chart, 'select', function(e) {
                        googleCharts.showSlectedMarkerDetails(seismicDataObj, chart.getSelection()[0].row);
                        chart.draw(data, options);
                    });
                } else {
                    $("#chart_div").html("");
                }
            });
        };

        this.showSlectedMarkerDetails = function(seismicEvents, selectedChartEntity) {
            $scope.selectedEntity = seismicEvents.earthquakes[selectedChartEntity];
            $scope.$apply();
        };

        // method used to draw the Bubble chart
        this.drawBubbleChart = function(year, month, minMagnitude) {
            SeismicService.getEqs(year, month, minMagnitude, function(seismicDataObj) {
                $scope.seismicEvents = seismicDataObj.earthquakes;

                if (seismicDataObj.earthquakes && seismicDataObj.earthquakes.length > 0) {
                    var dataArr = [];
                    dataArr[0] = ['', 'date', 'Magnitude', '', 'Depth'];
                    for (var i = 0; i < seismicDataObj.earthquakes.length; i++) {
                        dataArr[i + 1] = ['',
                            new Date(parseInt(seismicDataObj.earthquakes[i].timedate.substring(0, 4)),
                                parseInt(seismicDataObj.earthquakes[i].timedate.substring(5, 7)) - 1,
                                parseInt(seismicDataObj.earthquakes[i].timedate.substring(8, 10))),
                            parseInt(seismicDataObj.earthquakes[i].magnitude),
                            'Depth <' + Math.ceil(parseInt(seismicDataObj.earthquakes[i].depth) / 100) + '00',
                            parseInt(seismicDataObj.earthquakes[i].depth)
                        ];
                    }

                    var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
                    var data = google.visualization.arrayToDataTable(dataArr);

                    //set chart Title, width, height and titles for X and Y axis
                    var options = {
                        title: 'Earthquake Magnitude by Date',
                        height: $(window).height() - ($(window).height()) / 12 * 3,
                        width: $(window).width() - ($(window).width()) / 12 * 3,
                        chartArea: {
                            width: '75%',
                            height: '80%'
                        },
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'Magnitude'
                        }
                    };

                    chart.draw(data, options);
                } else {
                    $("#chart_div").html("");
                }
            });
        };
    }
]);


// Controller that manages interaction with the SeismicService
app.controller('SeismicEventController', ['$scope', 'SeismicService',
    function($scope, SeismicService) {
        var seismicEvents = this;

        this.getEqs = function(year, month, minMagnitude) {
            SeismicService.getEqs(year, month, minMagnitude, function(seismicDataObj) {
                seismicEvents.eventCount = seismicDataObj.count;
                seismicEvents.earthquakes = seismicDataObj.earthquakes;
            });
        };
    }
]);

// Controller used to fetch Year and Month
app.controller('CalendarController', ['$scope',
    function($scope) {

        this.getYears = function() {
            var years = [];
            for (var year = 2014; year > 2000; year--) {
                years.push(year);
            };
            return years;
        };

        this.getMonths = function() {
            return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        };
    }
]);
