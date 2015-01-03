describe('Test CalendarController methods', function() {
    var $scope, calendarCtrl;

    beforeEach(module('myapp'));
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        calendarCtrl = $controller('CalendarController', {
            $scope: $scope
        });
    }));

    it("should return months", function() {
        expect(calendarCtrl.getMonths()).toEqual(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
    });

    it("should return months", function() {
        expect(calendarCtrl.getYears()).toEqual([2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001]);
    });
});
