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

function renameTabs(newTitle) {
document.title = newTitle;
}
