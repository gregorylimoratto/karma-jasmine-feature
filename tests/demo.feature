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
		
	Scenario Outline: Should allow ' in scenario
		Given I add a quote ' in step
		When I run the scenario with <I'm a param>
		Then the first Example is "TEST"
		
	Examples:
		| I'm a param |
		| TEST		  |