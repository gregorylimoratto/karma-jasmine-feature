	Feature: Ignore others

	Scenario: Should be ignored
		Given A scenario with no js implementation
		When I include this scenario
		Then Nothing happens

	@ignoreOthers
	Scenario: Should run only this one
		Given A scenario with js implementation
    And With the @ignoreOthers flag
		When I include this scenario
		Then Others scenarii have not been executed
	