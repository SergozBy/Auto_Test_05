Feature: Booking tickets

Scenario: Book a single ticket successfully
  Given I am on the booking page
  When I select a movie, time, and a free chair
  And I click on "Забронировать"
  Then I should see a QR code confirming my booking

Scenario: Book multiple tickets successfully
  Given I am on the booking page
  When I select a movie, time, and two free chairs
  And I click on "Забронировать"
  Then I should see a QR code confirming my booking

Scenario: Attempt to book without selecting a chair
  Given I am on the booking page
  When I select a movie and time but no chair
  And I click on "Забронировать"
  Then I should see an error message that booking is not allowed
