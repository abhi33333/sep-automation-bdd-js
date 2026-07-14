@sep16
Feature: Click on the next button on payment plans page

    As a customer, I should be able to click on the next button on step 2 when I select a plan.

    #* AC1: Clicking on any plan should activate the next button
    #* AC2: When the customer clicks on the next button, the Step 3 page should be displayed.
    #* AC3: In the stepper, steps 1 and 2 should be green, and step 3 should be blue.
    #* AC4: The payment component should be displayed.
    #* AC5: A price summary should be displayed.
    #* AC6: The back button should be displayed and enabled.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        And user has completed start application step


    #Scenario: Clicking on upfront payment plan activates the next button
    #    Then the next button is disabled by deault
    #    When user selects the upfront payment plan
    #    Then the next button is enabled

    #Scenario: Clicking on installment payment plan activates the next button
    #    Then the next button is disabled by deault
    #    When user selects the installment payment plan
    #    Then the next button is enabled

    @sep16-1
    Scenario Outline: Clicking on any payment plan activates the next button
        Then the next button is disabled by deault
        When user selects the "<payment_plan>" payment plan
        Then the next button is enabled

        Examples:
            | payment_plan |
            | Upfront      |
            | Installments |


    @sep16-2
    Scenario: Clicking on the next button navigates to step 3 page
        When user selects the "Upfront" payment plan
        And user clicks on the next button
        Then the review step stepper circle is blue
        And the payment plan stepper circle is green
        And the start application stepper circle is green


    @sep16-3
    Scenario: Payment sumamry is dispalyed after selecting a payment plan
        When user selects the "Upfront" payment plan
        Then the upfront payment summary is displayed
        When user selects the "Installments" payment plan
        Then the installment payment summary is displayed
        And the back button is displayed and enabled