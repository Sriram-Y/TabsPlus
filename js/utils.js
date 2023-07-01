export async function getAllTabsInCurrentWindow() {
    const allTabsInWindow = await chrome.tabs.query({
        currentWindow: true
    });

    return allTabsInWindow;
}

export async function getAllTabGroupsInCurrentWindow() {
    const allTabGroupsInCurrentWindow = chrome.tabGroups.query({});

    return allTabGroupsInCurrentWindow;
}

export async function getTabIds() {
    const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();

    var tabIdsList = allTabsInCurrentWindow.map(tab => tab.id);
    
    console.log("%c" + tabIdsList, "color: red;");
    return tabIdsList;
}

export async function getTabTitles() {
    const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();

    var tabTitlesList = allTabsInCurrentWindow.map(tab => tab.title);

    console.log("%c" + tabTitlesList, "color: red;");
    return tabTitlesList;
}

export async function getTabGroupIds() {
    const allTabGroupsInCurrentWindow = await getAllTabGroupsInCurrentWindow();

    var tabGroupIdsList = allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.id);

    console.log("%c" + tabGroupIdsList, "color: red;");
    return tabGroupIdsList;
}

export async function getTabGroupTitles() {
    const allTabGroupsInCurrentWindow = await getAllTabGroupsInCurrentWindow();

    var tabGroupTitlesList = allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.title);

    console.log("%c" + tabGroupTitlesList, "color: red;");
    return tabGroupTitlesList;
}

export async function getTabTitleFromTabId(tabId) {
    var tabObject = await chrome.tabs.get(tabId);

    console.log("%c" + tabObject.title, "color: red;");
    return tabObject.title;
}

export async function getTabGroupTitleFromTabGroupId(tabGroupId) {
    var tabGroupObject = await chrome.tabGroups.get(tabGroupId);

    console.log("%c" + tabGroupObject.title, "color: red;");
    return tabGroupObject.title;
}
