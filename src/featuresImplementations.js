/* jshint globalstrict: true */
/* global FeatureSteps */
'use strict';

function FeaturesImplementations() {
    this.featureStepsDefinitions = [];
}

FeaturesImplementations.prototype.addFeature = function (featureRegExp) {
    var featureStep = new FeatureSteps(featureRegExp);
    this.featureStepsDefinitions.push(featureStep);
    return featureStep;
};

FeaturesImplementations.prototype.getMatchingFeatureStepsDefinition = function (feature) {
    var relevantFeatureSteps = this.featureStepsDefinitions.filter(function (featureStep) {
        var featureText = feature.description.replace(/[\ \t]*[\n\r]+[\ \t]*/g, "");
        return featureStep.pattern.test(featureText);
    });
    var combineStep = new FeatureSteps('');
    combineStep.steps = relevantFeatureSteps.reduce(function (reduce, item) {
        return reduce.concat(item.steps);
    }, []);
    combineStep.beforeSteps = relevantFeatureSteps.reduce(function (reduce, item) {
        return reduce.concat(item.beforeSteps);
    }, []);
    combineStep.afterSteps = relevantFeatureSteps.reduce(function (reduce, item) {
        return reduce.concat(item.afterSteps);
    }, []);
    return combineStep;
};

    