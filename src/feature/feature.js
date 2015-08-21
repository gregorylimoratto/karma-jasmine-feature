
/* jshint globalstrict: true */
/* global Scenario*/
'use strict';

function Feature(description) {
	console.log("FRITE" , description);
	this.description = description;
	this.scenarios = [];
}

Feature.prototype.scenario = function (description) {
	var scenario = new Scenario(description, this);
	this.scenarios.push(scenario);
	return scenario;
}; 
