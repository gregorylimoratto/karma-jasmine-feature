/* jshint globalstrict: true */
/* global StepParser */
'use strict';

function Step(keyword, description, parameters) {
	this.keyword = keyword;
	this.description = description;
	this.parameters = parameters;
}

Step.prototype.stringify = function () {
	return new StepParser(this.keyword, this.description, this.parameters).stringify();
};
