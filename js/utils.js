/*
* Author: Sriram Yadavalli
* Date: 7-4-2023
* Description: This script contains important or frequently used functions 
* that can be used through the application.
*/

export async function getAllTabsInCurrentWindow() {
    const allTabsInWindow = await chrome.tabs.query({
        currentWindow: true
    });
    await allTabsInWindow;

    return allTabsInWindow;
}

export async function getAllTabGroupsInCurrentWindow() {
    const allTabGroupsInCurrentWindow = await chrome.tabGroups.query({});
    await allTabGroupsInCurrentWindow;

    return allTabGroupsInCurrentWindow;
}

export async function getTabIds() {
    const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();
    await allTabsInCurrentWindow;

    var tabIdsList = await allTabsInCurrentWindow.map(tab => tab.id);
    await tabIdsList;
    
    console.log("%c" + tabIdsList, "color: red;");
    return tabIdsList;
}

export async function getTabTitles() {
    const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();
    await allTabsInCurrentWindow;

    var tabTitlesList = await allTabsInCurrentWindow.map(tab => tab.title);
    await tabTitlesList;

    console.log("%c" + tabTitlesList, "color: red;");
    return tabTitlesList;
}

export async function getTabGroupIds() {
    const allTabGroupsInCurrentWindow = await getAllTabGroupsInCurrentWindow();
    await allTabGroupsInCurrentWindow;

    var tabGroupIdsList = await allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.id);
    await tabGroupIdsList;

    console.log("%c" + tabGroupIdsList, "color: red;");
    return tabGroupIdsList;
}

export async function getTabGroupTitles() {
    const allTabGroupsInCurrentWindow = await getAllTabGroupsInCurrentWindow();
    await allTabGroupsInCurrentWindow;

    var tabGroupTitlesList = await allTabGroupsInCurrentWindow.map(tabGroup => tabGroup.title);
    await tabGroupTitlesList;

    console.log("%c" + tabGroupTitlesList, "color: red;");
    return tabGroupTitlesList;
}

export async function getTabTitleFromTabId(tabId) {
    var tabObject = await chrome.tabs.get(tabId);
    await tabObject;
    console.log("%c" + tabObject.title, "color: red;");
    return tabObject.title;
}

export async function getTabGroupTitleFromTabGroupId(tabGroupId) {
    var tabGroupObject = await chrome.tabGroups.get(tabGroupId);
    await tabGroupObject;
    console.log("%c" + tabGroupObject.title, "color: red;");
    return tabGroupObject.title;
}

export async function getFolderTitle() {
    const title = prompt("Enter a name for your bookmarks folder: ", "My bookmarks");
    if(title === false) {
        return;
    }
    else {
        return title;
    }
}
