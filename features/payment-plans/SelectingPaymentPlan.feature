@sep14
Feature: Selecting a price plan

    As a customer, I want to be able to Choose a payment plan from the available options 
    so that I can choose the one that best suits my needs.

    #* AC1: When the user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
    #* AC2: Upon selecting any pricing option, the 'Next' button should become active (indicating the user can proceed).
    #* AC3: Users should be able to change their plan selections at any time before finalizing their choice.

Background:
        Given user is on the enrollment page
        And user has completed start application step

    #TODO: Create scenarios that cover all the acceptance criteria

    @sep14-1
    Scenario: Verify that the Next button is disabled before selecting a payment plan
            Then the Next button should be disabled

    @sep14-2
    Scenario: Verify that the Upfront payment plan is highlighted when selected
        When user selects the Upfront payment plan
        Then the Upfront payment plan should be highlighted


    @sep14-3
    Scenario: Verify that the Installments payment plan is highlighted when selected
        When user selects the Installments payment plan
        Then the Installments payment plan should be highlighted


    @sep14-4
    Scenario: Verify that selecting the Upfront payment plan enables the Next button
        When user selects the Upfront payment plan
        Then the Next button should be enabled


    @sep14-5
    Scenario: Verify that selecting the Installments payment plan enables the Next button
        When user selects the Installments payment plan
        Then the Next button should be enabled


    @sep14-6
    Scenario: Verify that the user can change the selection from Upfront to Installments
        When user selects the Upfront payment plan
        And user selects the Installments payment plan
        Then the Installments payment plan should be highlighted
        And the Upfront payment plan should not be highlighted
        And the Next button should remain enabled


    @sep14-7
    Scenario: Verify that the user can change the selection from Installments to Upfront
        When user selects the Installments payment plan
        And user selects the Upfront payment plan
        Then the Upfront payment plan should be highlighted
        And the Installments payment plan should not be highlighted
        And the Next button should remain enabled