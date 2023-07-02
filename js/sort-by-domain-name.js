/*
CMSC495-6383
Tabs Plus - Group 2: Browser Bruins
Alexander Hong, Matthew Reed, Nicolas Hernandez
Nima Emamian, Ruben Rivera, Sriram Yadavalli
Last Modified Date: 07/02/2023
IDE: VS Code
*/

// Importing the function "getAllTabsInCurrentWindow" from "utils.js" module.
import { getAllTabsInCurrentWindow } from "./utils.js";

// Get the HTML element with the id "sortByDomainName". This is the button we'll use to sort tabs by domain name.
var sortByDomainNameButton = document.getElementById("sortByDomainName");

// Add an event listener to the button. This means, whenever the button is clicked, 
// it will trigger the function we define here. We're using an asynchronous function, 
// as we may need to wait for some actions to complete.
sortByDomainNameButton.addEventListener("click", async function() {
    // When the button is clicked, a confirmation window is shown to the user. If they click "OK", it returns true. 
    // If they click "Cancel", it returns false.
    if (window.confirm("This action will sort all tabs by domain name in the current window. Are you sure you want to continue?")) {
        // If the user confirmed, log that they want to proceed and call the "sortTabsByDomain" function.
        console.log("User wants to proceed with sorting tabs by domain.");
        await sortTabsByDomain();
    } else {
        // If the user canceled, log that they're aborting.
        console.log("User is aborting sorting tabs by domain.");
    }
});

// This asynchronous function is responsible for sorting the tabs by domain name.
async function sortTabsByDomain() {
    try {
        // Get all the tabs in the current window. This is an asynchronous operation, so we wait for it to complete.
        const allTabsInWindow = await getAllTabsInCurrentWindow();

        // Create a new map to store the tabs by their domain name.
        let tabMap = new Map();

        // For each tab, get the domain name from the URL and add it to the map.
        allTabsInWindow.forEach(tab => {
            const url = new URL(tab.url);
            const domain = url.hostname;

            // If the domain name is not already in the map, add it with an empty array as its value.
            if (!tabMap.has(domain)) {
                tabMap.set(domain, []);
            }
            // Add the tab to the array corresponding to its domain name.
            tabMap.get(domain).push(tab);
        });

        // Convert the map entries to an array and sort it by the domain names (the keys of the map entries).
        const sortedEntries = Array.from(tabMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

        let sortedTabIds = [];

        // For each sorted domain name, get the IDs of the tabs in its array and add them to the "sortedTabIds" array.
        for (let [domain, tabs] of sortedEntries) {
            const tabIds = tabs.map(tab => tab.id);
            sortedTabIds = sortedTabIds.concat(tabIds);
        }

        // Move each tab to its new position according to the sorted array of IDs.
        for (let index = 0; index < sortedTabIds.length; index++) {
            await chrome.tabs.move(sortedTabIds[index], {index});
        }

        // Log that the tabs have been sorted.
        console.log('Tabs have been sorted by domain name');
    }
    catch (error) {
        // If any error occurs during this process, log the error.
        console.error("An error occurred while sorting tabs by domain:", error);
    }
}
