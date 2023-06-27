export async function getAllTabsInCurrentWindow() {
    const allTabsInWindow = await chrome.tabs.query({
        currentWindow: true
    });

    return allTabsInWindow;
}

<<<<<<< Updated upstream
export async function getAllTabGroupsInCurrentWindow() {
    const allTabGroupsInCurrentWindow = chrome.tabGroups.query({});

    return allTabGroupsInCurrentWindow;
}

const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();
const allTabGroupsInCurrentWindow = await getAllTabGroupsInCurrentWindow();

export async function getTabIds() {  // Used for getting a specific tab
    var tabIdsList = allTabsInCurrentWindow.map(tab => tab.id);
    
    console.log("%c" + tabIdsList, "color: red;");
    return tabIdsList;
}

export async function getTabTitles() {
    var tabTitlesList = allTabsInCurrentWindow.map(tab => tab.title);

    console.log("%c" + tabTitlesList, "color: red;");
    return tabTitlesList;
}

export async function getTabGroupIds() {
    var tabGroupIdsList = allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.id);

    console.log("%c" + tabGroupIdsList, "color: red;");
    return tabGroupIdsList;
}

export async function getTabGroupTitles() {
    var tabGroupTitlesList = allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.title);

    console.log("%c" + tabGroupTitlesList, "color: red;");
    return tabGroupTitlesList;
}
=======

>>>>>>> Stashed changes
