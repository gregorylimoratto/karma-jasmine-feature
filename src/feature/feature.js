
/* jshint globalstrict: true */
/* global Scenario*/
'use strict';

function Feature(description) {
	this.description = description;
	this.scenarios = [];
}

Feature.prototype.ignoreOthers = function(){
	this.excludeOthers = true;
	return this;
}

Feature.prototype.ignore = function(){
	this.isIgnored = true;
	return this;
}

Feature.prototype.scenario = function (description) {
	var scenario = new Scenario(description, this);
	// feature transitive value for @ignoreOthers & @ignore
	if (this.excludeOthers)
		scenario.ignoreOthers();
		
	if (this.isIgnored)
		scenario.ignore();
	
	this.scenarios.push(scenario);
	return scenario;
}; 
