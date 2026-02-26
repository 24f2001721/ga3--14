const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=51',
  'https://sanand0.github.io/tdsdata/js_table/?seed=52',
  'https://sanand0.github.io/tdsdata/js_table/?seed=53',
  'https://sanand0.github.io/tdsdata/js_table/?seed=54',
  'https://sanand0.github.io/tdsdata/js_table/?seed=55',
  'https://sanand0.github.io/tdsdata/js_table/?seed=56',
  'https://sanand0.github.io/tdsdata/js_table/?seed=57',
  'https://sanand0.github.io/tdsdata/js_table/?seed=58',
  'https://sanand0.github.io/tdsdata/js_table/?seed=59',
  'https://sanand0.github.io/tdsdata/js_table/?seed=60',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector('table');
    const pageSum = await page.evaluate(() => {
      let sum = 0;
      document.querySelectorAll('td').forEach(cell => {
        const val = parseFloat(cell.innerText.replace(/,/g, ''));
        if (!isNaN(val)) sum += val;
      });
      return sum;
    });
    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);
  await browser.close();
})();
