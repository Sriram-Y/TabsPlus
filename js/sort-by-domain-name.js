import { getAllTabsInCurrentWindow } from "./utils";

class TabSorter {
    constructor() {
        this.tabMap = new Map();
    }

    async getTabsByDomain() {
        try {
            const allTabsInWindow = await getAllTabsInCurrentWindow();
            
            // Iterating through the tabs and storing in a map with id and url
            allTabsInWindow.forEach((tab) => {
                const url = new URL(tab.url);
                const domain = url.hostname;

                if (!this.tabMap.has(domain)) {
                    this.tabMap.set(domain, []);
                }
                this.tabMap.get(domain).push(tab);
            });
            
            return this.tabMap;
        } catch (error) {
            console.error('An error occurred while getting tabs by domain:', error);
        }
    }

    async sortTabsByDomain() {
        try {
            const tabsByDomain = await this.getTabsByDomain();
            let sortedTabIds = [];

            // Grouping tabs with urls with the same domain name together
            for (let [domain, tabs] of tabsByDomain) {
                const tabIds = tabs.map(tab => tab.id);
                sortedTabIds = sortedTabIds.concat(tabIds);
            }

            // Moving tabs in the window mapping the locations in the map to the window
            for (let index = 0; index < sortedTabIds.length; index++) {
                await chrome.tabs.move(sortedTabIds[index], {index});
            }

            console.log('Tabs have been sorted by domain name');
        } catch (error) {
            console.error('An error occurred while sorting tabs by domain:', error);
        }
    }
}

// Instantiate the TabSorter class
let tabSorter = new TabSorter();

// Get reference to the "Sort tabs by domain name" button
var sortByDomainNameButton = document.getElementById("sortByDomainName");

// Define an async function to sort tabs
async function sortTabsByDomainName() {
    if (window.confirm("This action will sort all tabs by domain name in the current window. Are you sure you want to continue?")) {
        console.log("User wants to proceed with sorting tabs by domain.");
        
        // Sort the tabs by domain
        await tabSorter.sortTabsByDomain();
    } else {
        console.log("User is aborting sorting tabs by domain.");
    }
}

// Bind the event to the sortByDomainNameButton
sortByDomainNameButton.addEventListener("click", sortTabsByDomainName);
