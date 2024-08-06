import puppeteer from "puppeteer";
import pinnedProyects from "./getProyectUrls.js";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

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


const getFullProyectInfo = async (user) => {
  const url = `https://github.com/${user}`;
  const proyectUrls = await pinnedProyects(url);
  const allproyects = Promise.all(
    proyectUrls.map(async (url) => {
      return await getProyectInfo(url);
    })
  );
  return allproyects;
};

const getProyectInfo = async (url) => {
  let browser   
  try{
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto(url);
    // por alguna razon en algunos titulos, no los regresa en formato string, no sé aun por qué
    const proyectName = await page.evaluate(() => {
      const proyectInfo = document.querySelectorAll(
        "div.flex-auto.min-width-0.width-fit a"
      );
      return Array.from(proyectInfo).map((info) => {
        const title = info.innerText;
        return title;
      });
    });

    const proyectDescription = await page.evaluate(() => {
      const proyectD = document.querySelectorAll("div.BorderGrid-cell p");
      return Array.from(proyectD).map((description) => {
        const descripcion = description.innerText;
        return descripcion;
      });
    });

    const proyectLanguages = await page.evaluate(() => {
      const proyectLang = document.querySelectorAll(
        "div.BorderGrid-cell li.d-inline"
      );
      return Array.from(proyectLang)
        .map((language) => {
          const lang = language.querySelector("span");
          return lang ? lang.innerText.toLocaleLowerCase() : null;
        })
        .filter((lang) => lang != null && !lang.includes("other"));
    });
    const proyectReadMe = await page.evaluate(() => {
      const proyectReadMe = document.querySelectorAll("article");
      return Array.from(proyectReadMe).map((readMe) => {
        const readMeText = readMe.innerText;
        return readMeText;
      });
    });

    const proyectReadMeImages = await page.evaluate(() => {
      const proyectReadMeImages = document.querySelectorAll("article a");
      return Array.from(proyectReadMeImages).map((img) => {
        const imgSrc = img.href;
        return imgSrc;
      });
    });
    await browser.close();

    return {
      [proyectName[1]]: proyectDescription,
      proyectReadMe,
      proyectReadMeImages,
      proyectLanguages,
    };
  }
  catch (error) {
    console.error('Error in getProyectInfo:', error);
    return "error";
  }
};

export default getFullProyectInfo;
