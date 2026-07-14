@sep11
Feature: Program start dates and Refund dates

    As a customer, I want to see the program start dates and refund policy details before enrolling
    so that I can make informed decisions.

    #* AC1: Program Start date and refund dates must be displayed in Step 1 in Test Automation with Selenium Program.

    Background:
        Given user is already on enrollment page

@sep11-1
    Scenario: Verify that program start date and refund date are displayed in step one
        Then the program start date is displayed.
        And the refund date is displayed.

@sep11-2
    Scenario: Verify that program start date and refund date are correct
        Then the displayed program start date is correct
        And the displayed refund date is correct
