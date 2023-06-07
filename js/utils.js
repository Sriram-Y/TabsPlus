export async function getAllTabsInCurrentWindow() {
    const allTabsInWindow = await chrome.tabs.query({
        currentWindow: true
    });

    console.log("IN CURRENT WINDOW");
    allTabsInWindow.forEach(function(tab) {
        console.log(tab.url);   // debug print
    });

    return allTabsInWindow;
}