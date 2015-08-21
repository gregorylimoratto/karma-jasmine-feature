/* global it */
/* global describe */
/* global window */
/* global module */
/* global console */
/* jshint globalstrict: true */
'use strict';
function createRunnableStep(delegate, description) {
	return {
		description: description,
		step: function (scenarioContext) {
			if (delegate) {
				delegate(scenarioContext);
			} else {
				throw description + "\nStep not found exception";
			}
		}
	};
}

function logBeforeRun(featureRunner) {
	var scenarios = featureRunner.features.reduce(function (memo, f) {
		return memo + f.scenarios.length;
	}, 0);
	console.log('Found ' + featureRunner.features.length + ' features with ' + scenarios + ' scenarios');
}

function FeatureRunner() {
	this.features = [];
	this.featuresImplementations = null;
}

FeatureRunner.prototype.run = function () {
	logBeforeRun(this);
	var self = this;
	this.features.forEach(function (feature) {
		self.runFeature(feature);
	});
};

FeatureRunner.prototype.runFeature = function (feature) {
	var self = this;
	var featureStepsDefinition = this.featuresImplementations.getMatchingFeatureStepsDefinition(feature);
	describe('\nFeature: ' + feature.description, function () {
		feature.scenarios.forEach(function (scenario) {
			self.runScenario(scenario, featureStepsDefinition);
		});
	});
};

FeatureRunner.prototype.runScenario = function (scenario, featureStepsDefinition) {
	describe('\n\nScenario: ' + scenario.description, this.runSteps(scenario, featureStepsDefinition));
};

FeatureRunner.prototype.runSteps = function (scenario, featureStepsDefinition) {
	var scenarioExecutableSteps = this.extractExecutableSteps(scenario, featureStepsDefinition);
	var description = scenarioExecutableSteps.reduce(function (memo, item) {
		memo += item.description ? '\n\t' + item.description : '';
		return memo;
	}, '');

	var scenarioContext = {};

	return function () {
		it(description, function (done) {
			scenarioExecutableSteps.forEach(function (executable) {
				executable.step(scenarioContext);
			});
			done();
		});
	};
};

FeatureRunner.prototype.extractExecutableSteps = function (scenario, featureStepsDefinition) {
	var beforeSteps = featureStepsDefinition.beforeSteps.map(function (definition) {
		return createRunnableStep(definition, '');
	});
	var afterSteps = featureStepsDefinition.afterSteps.map(function (definition) {
		return createRunnableStep(definition, '');
	});
	var runnableSteps = scenario.steps.map(function (step) {
		var stepToRun = featureStepsDefinition.getStep(step);
		return createRunnableStep(stepToRun, step.stringify());
	});
	var scenarioExecutableSteps = [].concat(beforeSteps)
		.concat(runnableSteps)
		.concat(afterSteps);
	return scenarioExecutableSteps;
};

