import puppeteer from "puppeteer";

async function startBrowser(){
    let browser;
    try {
        console.log("opening a browser....");
        browser = await puppeteer.launch({ // this is a launch method that launch an instance of the browser and also use await for promise resolve or reject. if resolve then try will run and if reject then catch will catch the error huh
            headless: false, // here headless is false. means agr hm browser ko open hota ar uska process hota howa dekhna chahty hain to headless ko false krdain otherwise true
            args: ["--disable-setuid-sandbox"], 
            ignoreHTTPSErrors: true, // agr https wali website sy data scrap kr rhy hain to during scraping agr https ky related koi error aa jata hai to usko ingore krdy ga
        });
    } catch (error) {
        console.log(`could not create a browser instance ${error}`);
    }

    return browser;
}

export default startBrowser;