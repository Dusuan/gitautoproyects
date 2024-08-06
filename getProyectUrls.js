import puppeteer from "puppeteer-core";
import chromium from 'chrome-aws-lambda';

async function getBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
  
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
  return browser;
}


const pinnedProyects = async (user) => {
  let browser;
  try{
  browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(user);

  const pinnedProyects = await page.evaluate(() => {
    const pinnedProyects = document.querySelectorAll(
      "ol.d-flex.flex-wrap.list-style-none.gutter-condensed.mb-2.js-pinned-items-reorder-list .pinned-item-list-item-content"
    ); // might need to change this selector if github styling changes
    return Array.from(pinnedProyects).map((pinnedProyect) => {
      const title = pinnedProyect.querySelector("a").href;
      return title;
    });
  });
  return pinnedProyects;
  } catch (error) {
    console.error('Error in pinnedProyects:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default pinnedProyects;
