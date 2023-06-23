import { getAllTabsInCurrentWindow } from "./utils.js";

var sortByDomainNameButton = document.getElementById("sortByDomainName");

sortByDomainNameButton.addEventListener("click", function() {
    if (window.confirm("This action will sort all tabs by domain name in the current window. Are you sure you want to continue?")) {
        console.log("User wants to proceed with sorting tabs by domain.");
        sortTabsByDomain();
    } else {
        console.log("User is aborting sorting tabs by domain.");
    }
});

function getTabsByDomain(callback) {
    let tabMap = new Map();
    
    chrome.tabs.query({currentWindow: true}, allTabsInWindow => {
        allTabsInWindow.forEach(tab => {
            const url = new URL(tab.url);
            const domain = url.hostname;

            if (!tabMap.has(domain)) {
                tabMap.set(domain, []);
            }
            tabMap.get(domain).push(tab);
        });

        callback(tabMap);
    });
}

function sortTabsByDomain() {
    getTabsByDomain(tabsByDomain => {
        let sortedTabIds = [];
        
        for (let [domain, tabs] of tabsByDomain) {
            const tabIds = tabs.map(tab => tab.id);
            sortedTabIds = sortedTabIds.concat(tabIds);
        }

        for (let index = 0; index < sortedTabIds.length; index++) {
            chrome.tabs.move(sortedTabIds[index], {index});
        }

        console.log('Tabs have been sorted by domain name');
    });
}