# karma-jasmine-feature

Karma plugin that use gherkin feature files to describe tests

# How to use

'''
npm install karma-jasmine-feature --save-dev
'''

'''
frameworks: ['jasmine', 'jasmine-feature'],
'''

then include features files in karma  :
'''
 files: [
      ...
      'features/**/*.feature'
	  ...
    ]
'''

and implements specs
'''
featureSteps('feature title')
		.given('I have two persons', function(persons){
			this.persons = persons;
		})
		.when('I remove the first one', function(){
			this.persons.splice(0,1);
		})
		.then('I have just one person', function(person){
			expect(this.persons[0]).toEqual(person);
		});
	
'''

TODO : doc...