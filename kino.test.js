const puppeteer = require('puppeteer');

describe('Booking Tickets Test Suite', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('https://qamid.tmweb.ru/client/index.php');
  });

  afterAll(async () => {
    await browser.close();
  });

  // Happy Path Test 1: Successful booking with valid details
  test('Should book a ticket successfully with valid details', async () => {
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

  });

  // Happy Path Test 2: Booking multiple tickets successfully
  test('Should book a multiple tickets successfully with valid details', async () => {
    // Selct tomorow
    await page.click('.page-nav__day.page-nav__day_chosen');

    // Select a movie
    await page.click('.movie-seances__time');

    // Finding and select a first free chair
    await page.$$eval('.buying-scheme__chair.buying-scheme__chair_standart', spans => {
      for (const span of spans) {
        if (span.textContent == '') {
          span.click();
          break; // Clicking the first matching button and exiting the loop
        } else {
          console.error('No free chair for me');
        }
      }
    });

    // Finding and select a second free chair
    await page.$$eval('.buying-scheme__chair.buying-scheme__chair_standart', spans => {
      for (const span of spans) {
        if (span.textContent == '') {
          span.click();
          break; // Clicking the first matching button and exiting the loop
        } else {
          console.error('No free chair for girlfrend');
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
  });

  // Sad Path Test: Attempting to book without selecting a seat
  test('Should fail booking if no seat is selected', async () => {
    // Selct tomorow
    await page.click('.page-nav__day.page-nav__day_chosen');

    // Select a movie
    await page.click('.movie-seances__time');

    // Step with selecting free seat is skipped

    // Finding and clicking a button with the text 'Забронировать'
    await page.$$eval('.acceptin-button', buttons => {
      for (const button of buttons) {
        const expected = 'true';
        if (button.textContent === 'Забронировать' && button.getAttribute('disabled') === expected) {
          console.error('Can not make booking');
          break;
        } else {
          button.click();
          console.error('Booking is not restricted');
        }
      }
    });
  });
});
