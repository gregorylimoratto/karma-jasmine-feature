/* global __dirname */
// Karma configuration
// Generated on Thu Aug 06 2015 09:10:14 GMT+0200 (Paris, Madrid (heure d’été))

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initFeatureRunner = function(files, preprocessors) {
  preprocessors['**/*.feature'] = ['gherkin'];
  files.unshift(createPattern(__dirname + '/lib/adapter.js'));
  files.unshift(createPattern(__dirname + '/lib/feature-runner-api.js'));
};
initFeatureRunner.$inject = ['config.files', 'config.preprocessors'];




module.exports = function(config) {
  config.set({
    
    plugins:['karma-*', {
      'framework:jasmine-feature': ['factory', initFeatureRunner],
      'preprocessor:gherkin': ['factory', require('./lib/gherkin-preprocessor')]
    }],
    
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-feature'],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      'tests/**/*.js',
      'tests/**/*.feature'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9999,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
