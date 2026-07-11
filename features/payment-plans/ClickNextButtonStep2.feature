@sep16
Feature: Click on the next button on payment plans page   #! Test Only

    As a customer, I should be able to click on the next button on step 2 when I select a plan.

    #* AC1: Clicking on any plan should activate the next button
    #* AC2: When the customer clicks on the next button, the Step 3 page should be displayed.
    #* AC3: In the stepper, steps 1 and 2 should be green, and step 3 should be blue.
    #* AC4: The payment component should be displayed.
    #* AC5: A price summary should be displayed.
    #* AC6: The back button should be displayed.
    #* AC7: By default, the pay button should be displayed.

    Background:
        Given user is on the enrollment page
        And user has completed step one with valid information
        And user is on step two of the enrollment process

    @sep16-1
    Scenario: The next button is disabled by default before a plan is selected
        Then the next button should be disabled

    @sep16-2
    Scenario: Verify full upfront payment plan flow from selection to review page
        When user clicks the upfront payment plan
        Then the next button should be enabled
        And the upfront price summary should be displayed on the payment plan page

        When user clicks the next button on the payment plan page
        Then the review page should be displayed
        And the start application stepper circle should be green
        And the payment plan stepper circle should be green
        And the review stepper circle should be blue
        And the payment component should be displayed
        And the upfront price summary should be displayed on the review page
        And the back button should be displayed
        And the pay button should be displayed

    @sep16-3
    Scenario: Verify full installments payment plan flow from selection to review page
        When user clicks the installments payment plan
        Then the next button should be enabled
        And the installments price summary should be displayed on the payment plan page

        When user clicks the next button on the payment plan page
        Then the review page should be displayed
        And the start application stepper circle should be green
        And the payment plan stepper circle should be green
        And the review stepper circle should be blue
        And the payment component should be displayed
        And the installments price summary should be displayed on the review page
        And the back button should be displayed
        And the pay button should be displayed