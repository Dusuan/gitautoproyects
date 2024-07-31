import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda"
const pinnedProyects = async (user) => {
  try{
  const browser = await  puppeteer.launch({
    args: isLocal ? [] : chrome.args,
    executablePath: isLocal ? puppeteer.executablePath() : await chrome.executablePath,
    headless: isLocal ? true : chrome.headless,
  });

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
  }
  finally{
    await  browser.close();

  }};

export default pinnedProyects;
