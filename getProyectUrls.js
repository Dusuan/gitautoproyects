import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";
import puppeteerCore from "puppeteer-core";

 async function getBrowser() {
  if (process.env.VERCEL_ENV === "production") {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    const browser = await puppeteer.launch();
    return browser;
  }
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
