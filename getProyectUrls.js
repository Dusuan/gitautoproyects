import puppeteer from "puppeteer";

async function getBrowser() {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(), // Ensure Puppeteer uses the correct path
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
