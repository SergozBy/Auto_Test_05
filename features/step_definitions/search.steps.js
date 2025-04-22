const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('I am on the booking page', async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('https://qamid.tmweb.ru/client/index.php');
});

When('I select a movie, time, and seat', async () => {
  // Selct tomorow
  await page.click('.page-nav__day.page-nav__day_chosen');

  // Select a movie
  await page.click('.movie-seances__time');

  // Finding and select a free chair
  await page.$$eval('.buying-scheme__chair.buying-scheme__chair_standart', spans => {
    for (const span of spans) {
      if (span.textContent == '') {
        span.click();
        break; // Clicking the first matching button and exiting the loop
      } else {
        console.error('No free chair');
      }
    }
  });

  // Finding and clicking a button with the text 'Забронировать'
  await page.$$eval('.acceptin-button', buttons => {
    for (const button of buttons) {
      if (button.textContent === 'Забронировать') {
        button.click();
        break; // Clicking the first matching button and exiting the loop
      }
    }
  });
  
  // Finding and clicking a button with the text 'Получить код бронирования'
  await page.$$eval('.acceptin-button', buttons => {
    for (const button of buttons) {
      if (button.textContent === 'Получить код бронирования') {
        button.click();
        break; // Clicking the first matching button and exiting the loop
      }
    }
  });
  
});

Then('I should see a confirmation message', async () => {
  await page.$$eval('.ticket__info-qr', text => {
    for (const t of text) {
      const expected = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";
      if (t.textContent === expected) {
        break;
      } else {
        console.error('Text not match');
      }
    }
  });

  await browser.close();
});
