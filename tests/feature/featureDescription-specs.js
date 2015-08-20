/* global featureRunner */
/* global expect */
/* global it */
/* global describe */
/* global featureSteps */
/* jshint globalstrict: true */
'use strict';
	featureSteps('jasmine-cucumber: Should use (.*) to find matchable steps')
		.given('enqueue "(.*)"', function(num){
			this.inputs = this.inputs || [];
			this.inputs.push(num);
		})
		.then('should be "(.*)"', function(str){ 
			expect(this.inputs.join(',')).toBe(str); 
		});
		
	featureSteps('jasmine-cu')
		.given('I have two persons', function(persons){
			this.persons = persons;
		})
		.when('I remove the first one', function(){
			this.persons.splice(0,1);
		})
		.then('I have just one person', function(person){
			expect(this.persons[0]).toEqual(person);
		});
	featureRunner().run();