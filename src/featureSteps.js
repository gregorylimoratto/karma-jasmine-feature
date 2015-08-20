/* jshint globalstrict: true */
'use strict';

function FeatureSteps(featurePattern) {
    this.pattern = new RegExp(featurePattern);
    this.beforeSteps = [];
    this.afterSteps = [];
    this.steps = [];
}

FeatureSteps.prototype.before = function (delegate) {
    this.beforeSteps.push(delegate);
    return this;
};

FeatureSteps.prototype.after = function (delegate) {
    this.afterSteps.push(delegate);
    return this;
};

FeatureSteps.prototype.given =
FeatureSteps.prototype.when =
FeatureSteps.prototype.then = function (pattern, definition) {
    this.steps.push({ pattern: new RegExp('^' + pattern + '$'), definition: definition });
    return this;
};

/*
* return an object that contains the function to execute for the step
* and the parameters to give it (from the step definition)
*/
FeatureSteps.prototype.getStep = function (step) {
    var matchingSteps = this.steps
        .map(function (featureStep) {
            var result = featureStep.pattern.exec(step.description);
            return {
                definition: featureStep.definition,
                pattern: featureStep.pattern,
                arguments: result ? result.slice(1).concat([step.parameters]) : null,
                match: !!result
            };
        })
        .filter(function (item) {
            return item.match;
        });

    var stepExectionDelegate = null;
    if (matchingSteps.length === 1) {
        stepExectionDelegate = function (scenarioContext) {
            try {
                matchingSteps[0].definition.apply(scenarioContext, matchingSteps[0].arguments);
            }
            catch (e) {
                throw new Error('error while executing "' + step.description + '"\n ' + e.toString() + '\n' + e.stack);
            }
        };
    }
    return stepExectionDelegate;
};
