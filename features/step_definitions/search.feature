Feature: Search a course
    Scenario: Should search by text
        Given user is on "/navigation" page
        When user search by "тестировщик"
        Then user sees the course suggested "Тестировщик ПО"

        Scenario: Successful ticket booking
            Given I am on the booking page
            When I select a movie, time, and seat
            Then I should see a confirmation message
