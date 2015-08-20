/* global StepParser */
/* global expect */
/* global it */
/* global describe */
/* jshint globalstrict: true */
	'use strict';
	describe('Step parser',function(){
		it('Should stringify step with no parameters table', function() {
			var result = new StepParser("Given", "a person", undefined).stringify();
			expect(result).toBe('Given a person');
		});
		
		/*
		Given a person
			|  name | age |
			| Lance |   3 |
		*/
		it('Should stringify step with one parameter in the table', function() {
			var result = new StepParser("Given", "a person", 
				[{ name : 'Lance', age : 3 }]
			).stringify();
			
			expect(result).toBe('Given a person\n'+
			'\t |  name | age | \n'+
			'\t | Lance |   3 | ');
		});
		
		/*
		Given a person
			|  name | age |
			| Lance |   3 |
			|  Lana |   2 |
		*/
		it('Should stringify step with multiple parameters table', function() {
			var result = new StepParser("Given", "a person", 
				[{ name : 'Lance', age : 3 }, { name : 'Lana', age : 2 }]
			).stringify();
			expect(result).toBe('Given a person\n'+
			'\t |  name | age | \n'+
			'\t | Lance |   3 | \n'+
			'\t |  Lana |   2 | ');
		});
		
	});
