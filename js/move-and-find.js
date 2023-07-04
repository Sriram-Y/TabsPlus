chrome.runtime.onMessage.addListener(async function (message) {
    const [id, searchString] = message.message;
    console.log("Received data:", id, searchString);
    await move(id, searchString);
    // find(searchString);
});

async function move(tabId, searchString) {
    // areAllTabsLoaded(async function (loaded) {
    //     if (loaded) {
    //         // Move
    //         chrome.tabs.query({}, function (tabs) {
    //             for (var i = 0; i < tabs.length; i++) {
    //                 if (tabs[i].id === tabId) {
    //                     chrome.tabs.update(tabId, { active: true });
    //                     break;
    //                 }
    //             }
    //         });
    //     }
    // });

    // var loaded = areAllTabsLoaded();
    // await loaded;
    // if (loaded) {
        // Move
        // chrome.tabs.query({}, function (tabs) {
        //     for (var i = 0; i < tabs.length; i++) {
        //         if (tabs[i].id === tabId) {

        //             break;
        //         }
        //     }
        // });
        chrome.tabs.update(tabId, { active: true });
    // }
}

async function areAllTabsLoaded() {
    var allTabsLoaded = false;
    // await chrome.windows.getCurrent({ populate: true }, async function (window) {
    //     await chrome.tabs.query({ windowId: window.id }, async function (tabs) {
    //         allTabsLoaded = true;

    //         tabs.forEach(function (tab) {
    //             if (tab.status !== "complete") {
    //                 allTabsLoaded = false;
    //                 return; // Exit the loop early if any tab is still loading
    //             }
    //         });
    //     });
    // });

    var tabs = await chrome.tabs.query({
        currentWindow: true
    });

    tabs.forEach(function (tab) {
        if (tab.status !== "complete") {
            allTabsLoaded = false;
            return; // Exit the loop early if any tab is still loading
        }
    });

    return allTabsLoaded;
}