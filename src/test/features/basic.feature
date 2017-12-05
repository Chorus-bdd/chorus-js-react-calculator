Uses: StepRegistry
Uses: Selenium
Uses: Chorus Context
Uses: Timers

Feature: Basic steps

  #! StepRegistry start
  Feature-Start:
    Given I open Chrome

  Background:
    Given I navigate to http://localhost:3000
    And StepRegistry client SimpleStepPublisher is connected

  Scenario: I can press a calculator key
    Given I press the 8 key
    Then the display shows 8
    And I wait for 5 seconds to see what it looks like


