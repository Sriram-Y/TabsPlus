import { getAllTabsInCurrentWindow } from "./utils.js";

var sortByDomainNameButton = document.getElementById("sortByDomainName");

sortByDomainNameButton.addEventListener("click", async function() {
    if (window.confirm("This action will sort all tabs by domain name in the current window. Are you sure you want to continue?")) {
        console.log("User wants to proceed with sorting tabs by domain.");
        await sortTabsByDomain();
    } else {
        console.log("User is aborting sorting tabs by domain.");
    }
});

async function sortTabsByDomain() {
    try {
        const allTabsInWindow = await getAllTabsInCurrentWindow();

        let tabMap = new Map();

        allTabsInWindow.forEach(tab => {
            const url = new URL(tab.url);
            const domain = url.hostname;

            if (!tabMap.has(domain)) {
                tabMap.set(domain, []);
            }
            tabMap.get(domain).push(tab);
        });

        // Convert the map entries to an array and sort it
        const sortedEntries = Array.from(tabMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

        let sortedTabIds = [];

        // Iterate over the sorted array to get the sorted tab IDs
        for (let [domain, tabs] of sortedEntries) {
            const tabIds = tabs.map(tab => tab.id);
            sortedTabIds = sortedTabIds.concat(tabIds);
        }

        // Move the tabs to their sorted positions
        for (let index = 0; index < sortedTabIds.length; index++) {
            await chrome.tabs.move(sortedTabIds[index], {index});
        }

        console.log('Tabs have been sorted by domain name');
    }
    catch (error) {
        console.error("An error occurred while sorting tabs by domain:", error);
    }
}
