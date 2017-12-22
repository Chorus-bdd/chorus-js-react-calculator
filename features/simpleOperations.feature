Uses: Web Sockets
Uses: Selenium
Uses: Chorus Context
Uses: Timers

Feature: Simple Operations
  
  I can perform simple additions, subtractions, divisions and multiplications

  Feature-Start:
    Given I start a web socket server
    And I open Chrome
    And I navigate to http://localhost:3000
    And I wait for the web socket client SimpleStepPublisher
  
  Background:
    Given I clear the calculator
  
  Scenario: I can add two numbers
    When I press the 1 key
    And I press the add key
    And I press the 2 key
    And I press the equals key
    Then the display shows 3
    
  Scenario: I can multiply two numbers
    When I press the 4 key
    And I press the multiply key
    And I press the 5 key
    And I press the equals key
    Then the display shows 20
    
  Scenario: I can divide two numbers
    When I press the 8 key
    And I press the divide key
    And I press the 2 key
    And I press the equals key
    Then the display shows 4
    
  Scenario: I can subtract two numbers
    When I press the 9 key
    And I press the subtract key
    And I press the 7 key
    And I press the equals key
    Then the display shows 2
    
  Step-Macro: I clear the calculator
    First I press the clear key
    And the display shows 0
  
  Feature-End:
    And I wait for 1 seconds to see the results


