module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'www/components/angular/angular.js',
      'www/components/angular-route/angular-route.js',
      'www/components/angular-resource/angular-resource.js',
      'www/components/angular-mocks/angular-mocks.js',      
      'www/components/jquery/dist/jquery.min.js',
      'www/js/unitTests/*.js',
      'www/js/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
