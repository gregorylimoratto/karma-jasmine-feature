Feature: Test feature

	
Scenario: Tester un scenario
	Given j'ai l'un des deux tests qui passe
	When je passe un parametre numérique 0
	And j'ai un deuxieme parametre de type table
	| A | B |
	| 0 |  test|
	| 8 | ùpkerù |
	Then Ce paramétre "là" et "celui là"  
	
Scenario Outline: c 
    Given j'ai un param <x> <A>
    When test <A>

    Examples:
      | x  | A  |
      | dd | oo |
      | ee | bb |