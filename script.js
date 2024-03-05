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
      get_results(info.srcUrl);
    }
  });
