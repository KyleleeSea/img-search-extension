import puppeteer from 'puppeteer';


// https://stackoverflow.com/questions/10423670/chrome-extension-that-copies-image-url-on-click

// On right click, get image URL and call API
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "fetchImageURL",
      title: "Find Similar Clothes",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fetchImageURL" && info.srcUrl) {
      console.log("Image URL:", info.srcUrl);
      var results = get_results(info.srcUrl);
      console.log(results)
    }
  });

// https://developer.chrome.com/docs/chromium/new-headless
// Webscrape the results (more documentation here im lazy af rn)
async function get_results(url) {
    var lens_url = "https://lens.google.com/uploadbyurl?url="
    var full_url = lens_url.concat(url)
    console.log("hit")
    const browser = await puppeteer.launch({
        headless: 'new',
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables "headful" mode.
      });
      
    const page = await browser.newPage();
    await page.goto(full_url);
      
    // Wait for all images to load
    await page.waitForSelector('img');

    // Extract image sources
    const imageSrcs = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.map(img => img.src);
    });
    
    console.log("Image Sources:", imageSrcs);
    
    await browser.close();
}