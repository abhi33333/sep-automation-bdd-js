@sep08
Feature: Display the steps of the checkout process

    As a customer, I should be able to know where I am in the checkout process using the stepper.

    #* AC1: The system should display the steps of the checkout process as "1-Start Application", "2-Payment Plan", and "3-Review".
    #* AC2: The system should highlight "Start Application" in blue.
    #* AC3: The system should display "Payment Plan" and "Review" in grey.

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page

    @sep08-1
    Scenario: Verify all three checkout steps are displayed with correct labels
        Then the stepper should display "Start Application" as step 1
        And the stepper should display "Payment plan" as step 2
        And the stepper should display "Review" as step 3

    @sep08-2
    Scenario: Verify Start Application step is highlighted in blue
        Then the start application stepper circle should be blue

    @sep08-3
    Scenario: Verify Payment Plan and Review steps are displayed in grey
        Then the payment plan stepper circle should be grey
        And the review stepper circle should be grey