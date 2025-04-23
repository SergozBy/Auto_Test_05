const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('I am on the booking page', async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('https://qamid.tmweb.ru/client/index.php');
});

When('I select a movie, time, and a free chair', async () => {
  await page.click('.page-nav__day.page-nav__day_chosen');
  await page.click('.movie-seances__time');
  await page.$$eval('.buying-scheme__chair.buying-scheme__chair_standart', chairs => chairs[0]?.click());
});

When('I select a movie, time, and two free chairs', async () => {
  await page.click('.page-nav__day.page-nav__day_chosen');
  await page.click('.movie-seances__time');
  await page.$$eval('.buying-scheme__chair.buying-scheme__chair_standart', chairs => {
    chairs[0]?.click();
    chairs[1]?.click();
  });
});

When('I select a movie and time but no chair', async () => {
  await page.click('.page-nav__day.page-nav__day_chosen');
  await page.click('.movie-seances__time');
});

When('I click on {string}', async (buttonText) => {
  await page.$$eval('.acceptin-button', buttons => {
    const button = buttons.find(btn => btn.textContent === buttonText);
    button?.click();
  });
});

Then('I should see a QR code confirming my booking', async () => {
  const message = await page.$eval('.ticket__info-qr', el => el.textContent);
  expect(message).toContain('Покажите QR-код нашему контроллеру для подтверждения бронирования.');
  await browser.close();
});

Then('I should see an error message that booking is not allowed', async () => {
  const isDisabled = await page.$eval('.acceptin-button', btn => btn.hasAttribute('disabled'));
  expect(isDisabled).toBe(true);
  await browser.close();
});
