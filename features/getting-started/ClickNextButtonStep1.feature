@sep19
Feature: Click on the next button on step 1

    As a customer, I should be able to click on the next button on step 1 when I give valid information.

    # Acceptance Criteria:
    #   1. The next button should take customers to step two when given valid information.
    #           a. Test by providing all fields
    #           b. Test by providing only the required fields

    Background:
        Given user is on the enrollment page

    @sep19-1
    Scenario: Verify that clicking next button after providing all the personal info will navigates the user to payment plan
        When user enters the first name
        And user enters the last name
        And user enters the email address
        And user enters phone number
        And user selects from How did you hear about us dropdown
        And user clicks the next button on start application step
        Then user should be navigated to payment plan step
        And the start application stepper circle should be green
        And the payment plan stepper circle should be blue


    @sep19-2
    Scenario: Verify that clicking next button after providing only the required personal info will navigates the user to payment plan
        When user enters the first name
        And user enters the last name
        And user enters the email address
        And user enters phone number
        And user clicks the next button on start application step
        Then user should be navigated to payment plan step
        And the start application stepper circle should be green
        And the payment plan stepper circle should be blue

