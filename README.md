# karma-jasmine-feature

Karma plugin that use gherkin feature files to describe tests with Jasmine


## Usage

### Install

karma-jasmine-feature is available as an npm module

Install locally with

	npm install karma-jasmine-feature --save-dev


### Features

The examples are written with Gherkin language : [https://github.com/cucumber/cucumber/wiki/Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)

	Feature: Addition 
		In order to avoid silly mistakes
		As a math idiot
		I want to be told the sum of two numbers
	
		Scenario: Add two numbers
			Given I have entered 50 into the calculator
			And I have entered 70 into the calculator
			When I press add
			Then the result should be 120 on the screen

		Scenario: Add two other numbers
			Given I have entered 10 into the calculator
			And I have entered 79 into the calculator
			When I press add
			Then the result should be 89 on the screen
			And failed the test


Each Gherkin ***Feature*** will become a jasmine ***describe***

And each ***Scenario*** will become a ***it***

### Javascript Specs

The plugin will look for each features implementation within karma included files and execute steps in the order that the feature specified

	featureSteps('Addition')
		.given('I have entered (.*) into the calculator', function(num){
			this.numbers = this.numbers || [];
			this.numbers.push(parseInt(num));
		})
		.when('I press add', function(){
			this.result = this.numbers.reduce(function(a,b){ return a + b },0);
		})
		.then('the result should be (.*) on the screen', function(expectedSum){
			expect(this.result).toBe(parseInt(expectedSum));
		})
		.then('failed the test', function(){
			expect(true).toBe(false);
		});

Each step is executed on an isolated scope (*this*) which can hold current scenario state.


You can add test initialize and cleanup :

	featureSteps('Addition')
	 	.before(function () {
			module('calculator'); // angular ng mock
			var scope = null;
			inject(function (_$injector_) {
				scope = _$injector_.get('$rootScope').$new();
			}); 
	       	this.scope = scope;
	    })
		.after(function(){
			...
		})
	...

To install :

	npm install karma-jasmine-feature --save-dev

Then, reference framework in karma.conf.js

	frameworks: ['jasmine', 'jasmine-feature'],


And just include feature files and specs in karma.conf.js

	files: [
		...
		'features/**/*.feature'
		...
	]



#### Examples


**TODO**