# karma-jasmine-feature

Karma plugin that use gherkin feature files to describe tests with Jasmine

Any feedback is appreciated ! 


## Usage

### Install

karma-jasmine-feature is available as an npm module

Install locally with

	npm install karma-jasmine-feature --save-dev


### Features

The examples are written with Gherkin language : [https://github.com/cucumber/cucumber/wiki/Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)

	Feature: Calculator addition 
		In order to avoid silly mistakes
		As a math idiot
		I want to be told the sum of two numbers
	
		Scenario: Add two numbers
			Given I have entered 50 into the calculator
			And I have entered 70 into the calculator
			When I press add
			Then the result should be 120 on the screen

		@ignore
		Scenario: Add two other numbers
			Given I have entered 10 into the calculator
			And I have entered 79 into the calculator
			When I press add
			Then the result should be 89 on the screen
			And failed the test


Each Gherkin ***Feature*** will become a jasmine ***describe***

And each ***Scenario*** will become a ***it***

Some tags will allow you to ignore feature execution : jasmine xdescribe() / xit()

- @ignore - ignore Feature or Scenario
- @ignoreOthers - ignore all other feature / scenario exept those with this tag

### Javascript Specs


The plugin will look for each features implementations within karma included files and execute matching steps.

The featureSteps() function host a set of steps that will be available for each feature that match the featureSteps regexp

```javascript
	featureSteps(/Calculator/)
		.given(/I have entered (.*) into the calculator/, function(num){
			// this step is for each feature that contains Calculator in title 
		});

	featureSteps('Calculator addition')
		.when('I press add', function(){
			// this one is not shared for "Calculator substraction"
		});
```

given/when/then step can be string or regular expression that match a step in the feature file.

```javascript
	featureSteps(/Addition/)
		.given(/I have entered (.*) into the calculator/, function(num){
			this.numbers = this.numbers || [];
			this.numbers.push(parseInt(num));
		})
		.when('I press add', function(){
			this.result = this.numbers.reduce(function(a,b){ return a + b },0);
		})
		.then(/the result should be (.*) on the screen/, function(expectedSum){
			expect(this.result).toBe(parseInt(expectedSum));
		})
		.then('failed the test', function(){
			expect(true).toBe(false);
		});
```

Each step is executed on an isolated scope (*this*) which can hold current scenario state. (reset for each scenario)

You can add test initialize and cleanup :

```javascript
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
```

To install :

	npm install karma-jasmine-feature --save-dev

Then, reference framework in karma.conf.js (require jasmine framework)

	frameworks: ['jasmine', 'jasmine-feature'],


And just include feature files and specs in karma.conf.js

	files: [
		...
		'features/**/*.feature'
		...
	]



#### Examples


demo.feature: 

	Feature: Roman numerals

	Background: 
		Given I have a Roman numerals calculator
		
	Scenario Outline: The calculator should transform simple roman numeral to number     
	    Given I enter '<roman>' in the calculator
	     When I convert the roman numeral
	     Then the displayed value is '<number>'
		 
	    Examples:
		| roman | number |
		|     I |      1 |
		|     V |      5 |
		|     X |     10 |
		|     L |     50 |
		|     C |    100 |
		
	Scenario: Should add two complex roman numerals
		Given I enter 'IX' in the calculator
		And I enter 'III' in the calculator
		When I press add
		Then the displayed value is 'XII'
	
	@ignore
	Scenario: Should be ignore
		Given A scenario with no js implementation
		When I include this scenario
		Then Nothing happens

demo.feature-specs.js

```javascript
	(function(){
	'use strict';
		featureSteps(/Roman numerals/)
			.given(/I have a Roman numerals calculator/, function(){
				this.calculator = new Calculator();
			})
			.given(/I enter '(.*)' in the calculator/, function(roman){
				this.calculator.setInput(roman);
			})
			.when(/I convert the roman numeral/, function(){
				this.calculator.convert();
			})
			.when(/I press add/, function(){
				this.calculator.add();
			})
			.then(/the displayed value is '(.*)'/, function(num){
				expect(this.calculator.getDisplayedValue()).toBe(num);
			});
	})();
```

----
#### Release Note

- 26/08/2015 : First release
	- Karma preprocessor to transform feature file into javascript file
	- Karma framework to execute features
	- exlude tests with @ignore & @ignoreOthers
	- custom api : 
		- map feature file "Feature" with featureStep(/* regexp that match Feature title + description */)
		- map steps with given / when / then (/* regexp to catch parameters */)