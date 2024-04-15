Feature: Create a user's fleet of vehicles

    In order to follow many vehicles with my application
    As an application user
    I should be able to create my fleet in the system

    @critical
    Scenario: I can create my fleet
        Given I don't have a fleet
        When I create my fleet
        Then I should have a fleet

    Scenario: I can't create more than one fleet
        Given my fleet
        And a vehicle
        When I try to create my fleet
        Then I should be informed that my fleet already exists

    Scenario: I can't create a fleet for an unexisting user
        Given a non-existant user id
        When I try to create my fleet
        Then I should be informed that this user does not exists
