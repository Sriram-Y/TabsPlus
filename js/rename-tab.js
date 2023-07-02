// Renames the title of a specific tab in Chrome browser.
export function renameTab(newTitle, specificTabId) {     
    chrome.scripting.executeScript({
      // Set current tab as target
      target: { tabId: specificTabId },
      // Inject renameTab func
      func: renameTabs,
      // Pass in newTitle as arg
      args: [newTitle],
    });   
    console.log("new title: " + newTitle);
}

// Sets the document title of the current tab to the specified new title.
function renameTabs(newTitle) {
document.title = newTitle;
}
