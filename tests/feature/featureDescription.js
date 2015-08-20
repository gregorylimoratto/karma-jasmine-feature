/* global expect */
/* global feature */
/* global it */
/* global describe */
/* jshint globalstrict: true */
	'use strict';
	feature('jasmine-cucumber: Should use regexp to find matchable steps') 
			.scenario('can call when after then')
				.given('enqueue "1"')
				.when('enqueue "2"')
				.then('should be "1,2"')
				.when('enqueue "3"')
				.then('should be "1,2,3"')
			.scenario('can convert json into table args')
				.given('I have two persons', [{lastName: "Doe", firstName:"John"}, {lastName:"Boby", firstName:"Poulpe"}])
				.when('I remove the first one')
				.then('I have just one person', {lastName:"Boby", firstName:"Poulpe"}); 
