@sep25
Feature: Error message for the invalid card number

    As a user, I want to be informed when my card info has failed.

    #* AC1: An immediate error message should be thrown if the card number is wrong or too short:
    #*              Your card number is incomplete.
    #*              Your card number is invalid.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        And user has completed start application step
        And user has completed payment plan step


    Scenario Outline: Car error message is displayed when enterd incomplete card number
        When user enters "<incomplete_card_number>" card number
        And user clicks the terms and conditions checkbox
        Then user should see the error message "Your card number is incomplete."

        Examples:
            | incomplete_card_number |
            | 1111                   |
            | 22222                  |



    Scenario Outline: Car error message is displayed when enterd invalid card number
        When user enters "<invalid_card_number>" card number
        And user clicks the terms and conditions checkbox
        Then user should see the error message "Your card number is invalid."

        Examples:
            | invalid_card_number |
            | 1234567890123456    |
            | 0000000000000001    |
            | 1111111111111111    |