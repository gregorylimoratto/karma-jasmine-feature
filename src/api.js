/* jshint globalstrict: true */
/* global Feature */
/* global FeaturesImplementations */
/* global FeatureRunner */
/* global window */
/* global module */
(function (exports) {
	'use strict';

	var runner;
	var features = [];
	var featuresImplementations;

	function getApiInterface() {
		return {
			"feature": function (description) {
				var feature = new Feature(description);
				features.push(feature);
				return feature;
			},
			"featureSteps": function (featurePattern) {
				featuresImplementations = featuresImplementations || new FeaturesImplementations();
				return featuresImplementations.addFeature(featurePattern);
			},
			"featureRunner": function () {
				runner = runner || new FeatureRunner();
				runner.features = features;
				runner.featuresImplementations = featuresImplementations;
				return runner;
			}
		};
	}

	var apiInterface = getApiInterface();
	exports = exports || {};
	for (var property in apiInterface) {
		if (apiInterface.hasOwnProperty(property)) {
			exports[property] = apiInterface[property];
		}
	}
})(typeof window !== 'undefined' ? window : module.exports);