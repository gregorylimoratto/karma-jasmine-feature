/* global __dirname */
var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initFeatureRunner = function(files, preprocessors) {
  preprocessors['**/*.feature'] = ['gherkin'];
  files.unshift(createPattern(require.resolve('./adapter.js')));
  files.unshift(createPattern(require.resolve('gherkin-specs-api')));
};

initFeatureRunner.$inject = ['config.files', 'config.preprocessors'];

module.exports = {
  'framework:jasmine-feature': ['factory', initFeatureRunner],
  'preprocessor:gherkin': ['factory', require('./gherkin-preprocessor')]
};