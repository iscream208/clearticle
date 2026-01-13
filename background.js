chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["Readability.js", "content.js"]
  }, () => {
    chrome.tabs.sendMessage(tab.id, { action: "toggleReader" });
  });
});