Feature: Booking tickets

    Background:
        Given I am on the booking page
        And I have selected a date and time

    Scenario: Book a single ticket successfully
        Given I have selected a free chair
        When I click on "Забронировать"
        Then I should see a QR code confirming my booking

    Scenario: Book a two ticket successfully
        Given I have selected a two free chairs
        When I click on "Забронировать"
        Then I should see a QR code confirming my booking

    Scenario: Attempt to book without selecting a chair
        When I click on "Забронировать"
        Then I should see an error message
