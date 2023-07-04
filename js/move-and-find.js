chrome.runtime.onMessage.addListener(async function(message) {
    const [id, searchString] = message.message;
    console.log("Received data:", id, searchString);
    await move(id, searchString);
    // find(searchString);
});

async function move(tabId, searchString) {
    areAllTabsLoaded(async function (loaded) {
        if (loaded) {
            // Move
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].id === tabId) {
                        chrome.tabs.update(tabId, { active: true });
                        break;
                    }
                }
            });
        }
        else {
            console.log("Failed. Trying Again.");
            move(tabId, searchString);
        }
    });
}

async function areAllTabsLoaded(callback) {
    chrome.windows.getCurrent({ populate: true }, function (window) {
        chrome.tabs.query({ windowId: window.id }, function (tabs) {
            var allTabsLoaded = true;

            tabs.forEach(function (tab) {
                if (tab.status !== "complete") {
                    allTabsLoaded = false;
                    return; // Exit the loop early if any tab is still loading
                }
            });

            callback(allTabsLoaded);
        });
    });
}