@sep10
Feature: Enter my Personal details

    As a customer, I should be able to enter my Personal details.

    #* AC1: Default field types and values should be as follows:
    #*          a. First Name: Text field is present.
    #*          b. Last Name: Text field is present.
    #*          c. Email Address: Text field is present and validates for email format.
    #*          d. Phone: The field allows numbers only.

    #* AC2: "How did you hear about us?" A standard dropdown list is present.
    #* AC3: The 'Next' button should be disabled if any required data is missing or invalid.

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page

    @sep10-1
    Scenario: Verify the First Name field is a text field
        Then the first name field should be a text field

    @sep10-2
    Scenario: Verify the Last Name field is a text field
        Then the last name field should be a text field

    @sep10-3
    Scenario: Verify the Email Address field validates for a proper email format
        When user enters an invalid email address
        And user clicks the next button on start application step
        Then user should remain on start application step
        And the email address field should not be accepted as valid

    @sep10-4
    Scenario: Verify the Phone field only accepts numeric characters
        When user attempts to enter letters and numbers into the phone number field
        Then the phone number field should contain only the numeric characters entered

    @sep10-5
    Scenario: Verify the How did you hear about us dropdown is a standard dropdown list
        When user clicks on the How did you hear about us dropdown
        Then a standard list of options should be displayed

    @sep10-6
    Scenario: Verify clicking Next does not navigate to payment plan when required data is missing
        When user clicks the next button on start application step
        Then user should remain on start application step
        And the first name field should show a validation error
        And the last name field should show a validation error
        And the email address field should show a validation error
        And the phone number field should show a validation error

    @sep10-7
    Scenario: Verify clicking Next does not navigate to payment plan when required data is invalid
        When user enters an invalid email address
        And user clicks the next button on start application step
        Then user should remain on start application step
        And the email address field should not be accepted as valid