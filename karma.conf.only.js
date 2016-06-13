module.exports = function(config) {
  require('./karma.conf')(config);
  config.set({
    exclude: ['tests/**/*.ignore-others.feature']
  });
}
