Uses: Web Sockets
Uses: Selenium
Uses: Chorus Context
Uses: Timers

Feature: Function Keys
  
  The function keys work as expected

  Feature-Start:
    Given I start a web socket server
    And I open the RemoteWebDriver browser
    And I navigate to ${calculatorURL}
    And I wait for the web socket client CalculatorStepPublisher
  
  Background:
    Given I clear the calculator
    
  Scenario: I can reverse the sign of a number using the sign key
    When I press the 5 key
    And I press the sign key
    And this step will fail
    Then the display shows -5

  Scenario: The percent key works by dividing the displayed number by 100
    When I press the 7 key
    And I press the 5 key
    And I press the percent key
    And I press the equals key
    Then the display shows 0.75

  Scenario: The dot key introduces a decimal point
    When I press the 7 key
    And I press the dot key
    And I press the 5 key
    Then the display shows 7.5  
    
  Scenario: The dot key can only introduce a single decimal point and the second attempt has no effect
    When I press the 7 key
    And I press the dot key
    And I press the 5 key
    And I press the dot key
    And I press the 5 key
    Then the display shows 7.55
    
  Step-Macro: I clear the calculator
    First I press the clear key
    And the display shows 0
  
  Feature-End:
    And I wait for 1 seconds to see the results


