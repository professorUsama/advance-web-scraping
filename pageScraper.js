const scrapObject = {
    url: "http://books.toscrape.com",
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.waitForSelector(".page_inner");

        // get the links to all the required books
        let urls = await page.$$eval("section ol > li", links =>{
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "in stock")
            links = links.map(el => el.querySelector("h3 > a").href)
            return links;
        });
        console.log(urls);
    }
}

export default scrapObject;
