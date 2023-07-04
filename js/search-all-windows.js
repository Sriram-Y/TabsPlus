/*
* Author: Sriram Yadavalli
* Date: 7-4-2023
* Description: This script searches through each tab in a window for a user 
* specified string. The tabs are then displayed underneath the feature button.
*/

import { getTabIds, getTabTitleFromTabId } from "./utils.js"

var searchAllWindowsButton = document.getElementById("searchAllWindows");

searchAllWindowsButton.addEventListener("click", async function () {
    if (window.confirm("This action will reload all tabs in the window. Are you sure you want to continue?")) {
        console.log("User wants to proceed with searching all tabs.");
        try {
            var stringFoundTabIds = [];
            var searchString = prompt("What would you like to search?");
    
            if (searchString != null && searchString.length != 0) {
                try {
                    loadAllTabsInWindow();
                }
                catch (loadingError) {
                    console.error("An error occurred while loading all tabs (preparing for search):", error);
                    alert("There was an error searching through all the tabs.")
                }
    
                const allTabsIdsInWindow = await getTabIds();
                await allTabsIdsInWindow;
    
                for (let i = 0; i < allTabsIdsInWindow.length; i++) {
                    var tabObject = await chrome.tabs.get(allTabsIdsInWindow[i]);
                    if (tabObject.url.includes('chrome://')) {
                        allTabsIdsInWindow.splice(i, 1);
                    }
                }
    
                for (let i = 0; i < allTabsIdsInWindow.length; i++) {
                    stringFoundTabIds.push(await searchInTab(allTabsIdsInWindow[i], searchString));
                }
    
                // Removing items equal to 0
                stringFoundTabIds = stringFoundTabIds.filter(item => item !== 0);
                // Removing duplicate items in list
                stringFoundTabIds = stringFoundTabIds.filter(item => stringFoundTabIds.indexOf(item) === stringFoundTabIds.lastIndexOf(item));
    
                // Now, bring into view the sub menu with titles appearing in a list
                const menuItemsElement = document.getElementById("search-all-windows-menu");
                menuItemsElement.innerHTML = "";    // clear existing menu items
    
                if (stringFoundTabIds.length > 0) {
                    stringFoundTabIds.forEach(async function (id) {
                        await getTabTitleFromTabId(id).then(async function (result) {
                            const listItem = document.createElement("li");
                            listItem.id = "tab-item";
                            listItem.onmouseover = function () {
                                listItem.style.color = "blue";
                            };
                            listItem.onmouseout = function () {
                                listItem.style.color = "";
                            };
                            listItem.textContent = result;
                            listItem.addEventListener("click", function () {
                                // await moveAndFind(id, searchString);
                                chrome.runtime.sendMessage({
                                    message: [id, searchString]
                                });
                            });
                            menuItemsElement.appendChild(listItem);
                        });
                    });
                }
                else {
                    const listItem = document.createElement("li");
                    listItem.id = "tab-item";
                    listItem.style.color = "red";
                    listItem.textContent = "No results for the search term were found.";
    
                    menuItemsElement.appendChild(listItem);
                }
    
                menuItemsElement.style.display = "block";
            }
            else {
                alert("Please enter a search term.");
            }
        }
        catch (error) {
            console.error("An error occurred while searching all windows:", error);
        }
    } 
    else {
        console.log("User is aborting searching all tabs.");
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
            return tabId;
        }
        else {
            return 0;
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

async function loadAllTabsInWindow() {
    // Get all tabs in the current window
    chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
        // Iterate over each tab
        tabs.forEach(function (tab) {
            // Reload the tab
            chrome.tabs.reload(tab.id);
        });
    });
}