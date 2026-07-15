@sep17
Feature: View payment plan options in Step 2   #! test only

    As a customer, I should be able to see payment plan options in Step 2.

    #* AC1: Upfront payment:
    #*      There should be only one upfront price
    #*      Text should be:
    #*              Upfront  (first row)
    #*              $ <upfont_price> pay once (second row)

    #* AC2: Installment plans:
    #*      There must be total <num> Payment Plans
    #*      There can be <number_of_installments> installments
    #*      If there are installments:
    #*            Text should be
    #*            <number_of_installments> Installments (first row)
    #*           $ <monthly_price> per month (second row)
    #*            Installment plans should be unique

Background:
        Given user is on the enrollment page
        And user has completed start application step

    #TODO: Create scenarios that cover all the acceptance criteria

    @sep17-1
    Scenario: Verify that only one Upfront payment plan is displayed
        Then only one Upfront payment plan should be displayed


    @sep17-2
    Scenario: Verify the text displayed for the Upfront payment plan
        Then the first row of the Upfront payment plan should display "Upfront"
        And the second row of the Upfront payment plan should display the expected upfront price followed by "pay once"


    @sep17-3
    Scenario: Verify the total number of payment plans
        Then the total number of payment plans should match the expected number


    @sep17-4
    Scenario: Verify the number of installments
        Then the number of installments should match the expected number


    @sep17-5
    Scenario: Verify the text displayed for the Installments payment plan
        Then the first row of the Installments payment plan should display the expected number of installments followed by "Installments"
        And the second row of the Installments payment plan should display the expected monthly price followed by "per month"


    @sep17-6
    Scenario: Verify that installment plans are unique
        Then all installment payment plans should be unique



    
