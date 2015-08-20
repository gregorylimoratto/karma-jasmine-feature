/* global featureSteps */
/* global feature */
/* global expect */
/* global it */
/* global window */
/* global describe */
/* jshint globalstrict: true */

	'use strict';
	describe('Feature',function(){
		it('should allow feature fluent declaration', function() {
			var feat = feature('jasmine-cucumber: Should support any order');
			feat
	  			.scenario('can call when after then')
			    	.given('enqueue "1"')
				    .when('enqueue "2"')
				    .then('should be "1,2"')
				    .when('enqueue "3"')
				    .then('should be "1,2,3"')
				.scenario("second scenario")
					.given("given step")
					.when("when step");
			expect(feat.scenarios.length).toBe(2);
			expect(feat.scenarios[0].steps.length).toBe(5);
			expect(feat.scenarios[1].steps.length).toBe(2);
		});
		
		it("should allow fluent features steps definition", function(){
			var featureStep = featureSteps('feature steps');
			featureStep
				.given('enqueue "(.*)"', function(num){ }) 
				.then('should be "(.*)"', function(str){ })
				.given('given step', function(num){ })
				.when('when step', function(){ });
		});
		
	});
