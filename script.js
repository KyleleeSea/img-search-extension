// https://stackoverflow.com/questions/10423670/chrome-extension-that-copies-image-url-on-click

// On right click, get image URL and call API
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "fetchImageURL",
      title: "Find Similar Clothes",
      contexts: ["image"]
    });
  });

  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log(info.srcUrl);
    var google_lens_url = "https://lens.google.com/uploadbyurl?url="
    if (info.menuItemId === "fetchImageURL") {
      // Create a headless tab
      const headlessTab = await chrome.tabs.create({ active: false });
  
      // Navigate to the specified URL
      var full_url = google_lens_url.concat(info.srcUrl);
      console.log(full_url);
      chrome.tabs.update(headlessTab.id, { url: full_url });
  
      // Wait for the tab to finish loading
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === headlessTab.id && changeInfo.status === "complete") {
            console.log("finished scraping");
          chrome.tabs.onUpdated.removeListener(listener);
          // Execute content script to fetch image URLs
          chrome.scripting.executeScript({
            target: { tabId: headlessTab.id },
            function: fetchImageURLs
          });
        }
      });
  
      // Function to fetch image URLs from the page
      function fetchImageURLs() {
        const imageUrls = [];
        const images = document.querySelectorAll("img");
        images.forEach(img => {
          imageUrls.push(img.src);
        });
        console.log("Image URLs:", imageUrls);
      }
    }
  });
  
//   chrome.contextMenus.onClicked.addListener((info, tab) => {
//     if (info.menuItemId === "fetchImageURL" && info.srcUrl) {
//       console.log("Image URL:", info.srcUrl);
//       get_results(info.srcUrl);
//     }
//   });

// Webscraping logic
