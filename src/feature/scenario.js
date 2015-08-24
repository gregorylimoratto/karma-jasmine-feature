
/* jshint globalstrict: true */
/* global Step */
'use strict';

function Scenario(description, feature) {
  this.description = description;
  this.steps = [];
  this.feature = feature;
}

Scenario.prototype.ignoreOther = function(){
	this.simpleRun = true;
	return this;
}

Scenario.prototype.addStep = function (keyword, description, parameters) {
  this.steps.push(new Step(keyword, description, parameters));
};

Scenario.prototype.given = function (description, parameters) {
  this.addStep("Given", description, parameters);
  return this;
};

Scenario.prototype.when = function (description, parameters) {
  this.addStep("When", description, parameters);
  return this;
};

Scenario.prototype.then = function (description, parameters) {
  this.addStep("Then", description, parameters);
  return this;
};

Scenario.prototype.and = function (description, parameters) {
  this.addStep("And", description, parameters);
  return this;
};

Scenario.prototype.scenario = function (description) {
  return this.feature.scenario(description);
};
