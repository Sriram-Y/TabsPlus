import { getTabIds, getTabTitleFromTabId } from "./utils.js"

var searchAllWindowsButton = document.getElementById("searchAllWindows");
var stringFoundTabIds = [];

searchAllWindowsButton.addEventListener("click", async function () {
    var searchString = prompt("What would you like to search?");
    if (searchString != null && searchString.length != 0) {
        const allTabsIdsInWindow = await getTabIds();
        await allTabsIdsInWindow;

        for (let i = 0; i < allTabsIdsInWindow.length; i++) {
            await searchInTab(allTabsIdsInWindow[i], searchString);
        }

        console.log(stringFoundTabIds);
    }
    else {
        alert("Please enter a search term.");
    }
});

async function searchInTab(tabId, searchString) {
    // Execute content script and handle the results
    const injectionResults = await chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: searchPage,
        args: [searchString],
    });
    await injectionResults;

    for (const { frameId, result } of injectionResults) {
        console.log(`Frame ${frameId} Result:`, result, "Tab ID:", tabId, "Tab Title:", getTabTitleFromTabId(tabId));
        if (result === true) {
            if (stringFoundTabIds.indexOf(tabId) === -1) {   // avoids duplicates
                stringFoundTabIds.push(tabId);
            }
        }
    }
}

async function searchPage(searchString) {
    // Create a regular expression object with the search query and the 'i' flag for case-insensitive search
    var regex = new RegExp(searchString, "i");

    // Get all the text content from the webpage
    var pageContent = document.body.innerText;

    // Perform the search using the regular expression
    var matches = pageContent.match(regex);

    if (matches) {
        console.log("Found matches:");
        console.log(matches);
        return true;
    }

    return false;
}
