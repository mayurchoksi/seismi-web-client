'use strict';

//Object representing the Home Page
var siesmiWebClientHomepage = {
    selectableOptions: element.all(by.css('.bullet-item')),
    get: function() {
        browser.get('/');
    },
    getTitle: function() {
        return browser.getTitle();
    },
    selectableOptionsCount: function() {
        return element.all(by.css('.bullet-item')).count();
    },
    getNthSelectableOption: function(nth) {
        return element.all(by.css('.bullet-item')).get(nth).element(by.tagName('a'));
    },    
    clickListOption: function() {
        element.all(by.css('.bullet-item')).first().click();
    }
};

//Object representing the List Page
var earthQuakeListPage = {
  getEqsCount: function() {
    return element.all(by.css('tbody tr')).count();
  }
};

describe('Seismi Web Client Integraton Tests', function() {

    describe('=>Home Page', function() {
        siesmiWebClientHomepage.get();

        it('=>Once loaded the Page Title should displayed', function() {
            expect(siesmiWebClientHomepage.getTitle()).toEqual('Seismi Web Client');
        });

        it('=>should see a list of 3 options to vizualize data', function() {
            expect(siesmiWebClientHomepage.selectableOptionsCount()).toMatch(3);
        });
    });

    describe('=>Earthquake List', function() {
        siesmiWebClientHomepage.get();

        it('=>Of the 3 options to vizualize data the first one is List', function() {
            expect(siesmiWebClientHomepage.getNthSelectableOption(0).getText()).toMatch('List');
        });

        it('=>Selecting the List option should list the latest recorded earthquakes', function() {
            siesmiWebClientHomepage.getNthSelectableOption(0).click();
            expect(earthQuakeListPage.getEqsCount()).toBeGreaterThan(0);
        });
    });
});