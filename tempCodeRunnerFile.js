import puppeter from 'puppeteer'
import pinnedProyects from './getProyectUrls.js';

const main = async () => {
    console.log(await pinnedProyects());
}

main()