/* global __dirname */
var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initFeatureRunner = function(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(__dirname + '/feature-runner-api.js'));
};

initFeatureRunner.$inject = ['config.files'];

module.exports = {
  'framework:jasmine-feature-runner': ['factory', initFeatureRunner]
};