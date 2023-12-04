const scrapObject = {
  url: "http://books.toscrape.com",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    await page.waitForSelector(".page_inner");

    // get the links to all the required books
    let urls = await page.$$eval("section ol > li", (links) => {
      links = links.filter(
        (link) =>
          link.querySelector(".instock.availability > i").textContent !==
          "in stock"
      );
      links = links.map((el) => el.querySelector("h3 > a").href);
      return links;
    });
    console.log(urls);

    const getPageData = (link) =>
      new Promise(async (resolve, reject) => {
        console.log("inside the promise");
        console.log(link);
        let dataObj = {};
        let newPage = await browser.newPage();
        await newPage.goto(link);
        dataObj["bookTitle"] = await newPage.$eval(
          ".product_main > h1",
          (text) => text.textContent
        );
        dataObj["bookPrice"] = await newPage.$eval(
          ".price_color",
          (text) => text.textContent
        );
        dataObj["noAvailable"] = await newPage.$eval(
          ".instock.availability",
          (text) => {
            // strip new line and tab spaces
            text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
            // get the number of stock
            let regexExp = /^.*\((.*)\).*$/i;
            let stockAvailable = regexExp.exec(text)[1].split(" ")[0];
            return stockAvailable;
          }
        );

        dataObj["imageUrl"] = await newPage.$eval(
          "#product_gallery img",
          (img) => img.src
        );
        dataObj["bookDescription"] = await newPage.$eval(
          "#product_description",
          (div) => div.nextSibling.nextSibling.textContent
        );
        dataObj["upc"] = await newPage.$eval(
          "table.table-striped > tbody > tr > td",
          (table) => table.textContent
        );
        resolve(dataObj);
      });

      for (const link in urls) {
        let currentPageData = await getPageData(urls[link]);
        console.log(currentPageData);
      }
  },
};

export default scrapObject;
