import pageScraper from "./pageScraper.js";

async function scrapAll(browserInstance){
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    } catch (error) {
        console.log(`error occur in the browser instance ${error}`);
    }
}

export default (browserInstance) => scrapAll(browserInstance);