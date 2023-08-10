/*
* Author: Sriram Yadavalli
* Date: 7-4-2023
* Description: This script looks for duplicate tabs in a window and closes 
* duplicate instances of the tab using the URL as comparison.
*/

import { getAllTabsInCurrentWindow } from "./utils.js";

var closeDuplicatesButton = document.getElementById("close-duplicate-tabs");

closeDuplicatesButton.addEventListener("click", async function() {
    if (window.confirm("This action will close duplicate tabs in the current window (preserving only ones in tab groups). Are you sure you want to continue?")) {
        console.log("User wants to proceed with closing duplicate tabs.");
        await closeDuplicateTabs();
    } else {
        console.log("User is aborting closing duplicate tabs.");
    }
});

async function closeDuplicateTabs() {
    try {
        const allTabsInWindow = await getAllTabsInCurrentWindow();
        
        // Resolving the returned promise to a list of tabObjects
        var tabObjects = allTabsInWindow.map(tab => ({ 
            id: tab.id, 
            title: tab.title, 
            url: tab.url, 
            groupId: tab.groupId 
        }));

        // Remove tabObjects with groupId not equal to -1. We only close duplicate tabs that are outside groups.
        tabObjects = tabObjects.filter(tab => tab.groupId === -1);

        var urls = [];
        var duplicates = [];

        // Finding duplicate tabs in tabObjects list
        tabObjects.forEach(function(tab) {
            if (!urls.includes(tab.url)) {
                urls.push(tab.url);
            }
            else {
                duplicates.push(tab);
                console.log(tab.url);
            }
        });

        console.log("\nDUPLICATE TABS");
        await Promise.all(
            duplicates.map(async function(tab) {
                console.log(tab.url); // Debug print
                await chrome.tabs.remove(tab.id); // Closing the tab
            })
        );
    }
    catch (error) {
        console.error("An error occurred while closing duplicate tabs:", error);
    }
}
