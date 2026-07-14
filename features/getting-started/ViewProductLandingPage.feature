@sep07
Feature: View Product Landing Page

    As a customer, I should be able to see the product landing page.

    #* AC1: The system displays the text "Cydeo Secure Checkout".
    #* AC2: The system should display the program name.
    #* AC3: Users should see a footer on the left side of the page that includes by order: 
    #*      logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy
    
    #* AC4: The system displays "Need help? Contact us at enrollment@cydeo.com" in the footer on the right.


    #TODO: Create scenarios that cover all the acceptance criteria
    
    Background:
        Given user is on the enrollment page
    @sep07-1
    Scenario: Verify that the "Cydeo Secure Checkout" text is displayed
        Then the "Cydeo Secure Checkout" text should be displayed


    @sep07-2
    Scenario: Verify that the program name is displayed
        Then the program name should be displayed


    @sep07-3
    Scenario: Verify that the left footer displays all required items
        Then the Cydeo logo should be displayed in the left footer
        And the Terms and Conditions link should be displayed in the left footer
        And the Privacy Policy link should be displayed in the left footer
        And the Disclaimer link should be displayed in the left footer
        And the Cookie Policy link should be displayed in the left footer


    @sep07-4
    Scenario: Verify that the left footer items are displayed in the correct order
        Then the left footer items should be displayed in the following order:
            | Cydeo logo           |
            | Terms and Conditions |
            | Privacy Policy       |
            | Disclaimer           |
            | Cookie Policy        |


    @sep07-5
    Scenario: Verify that the support contact information is displayed in the right footer
        Then the right footer should display "Need help? Contact us at enrollment@cydeo.com"

