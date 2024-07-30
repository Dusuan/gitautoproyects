import puppeter from "puppeteer";
import pinnedProyects from "./getProyectUrls.js";
import getFullProyectInfo from "./getFullProyectInfo.js";

const main = async () => {
  const result = await getFullProyectInfo();
  console.log(result);
};

main();
