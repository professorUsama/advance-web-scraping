import startBrowser from "./browser.js";
import scraperController from "./pageController.js";

// let browserInstance = BrowserObject.startBrowser(); // start browser and create a browser instance
let browserInstance = startBrowser();

scraperController(browserInstance);