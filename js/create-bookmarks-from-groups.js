import { getAllTabGroupsInCurrentWindow, getFolderTitle, getAllTabsInCurrentWindow } from "./utils.js";
import { createSubMenu } from "./frontend.js";

const targetListId = "groups-to-bookmarks-folder-menu";

var createBookmarksFolderFromGroupButton = document.getElementById(
    "groups-to-bookmarks-folder"
);

var toggleSwitchState = false;
createBookmarksFolderFromGroupButton.addEventListener("click", async function () {
    if(toggleSwitchState == false) {
        toggleSwitchState = true;
        const allTabGroupsInWindow = await getAllTabGroupsInCurrentWindow();
        // Resolving the returned promise to a list of tabObjects
        var tabGroupObjects = await allTabGroupsInWindow.map((tabGroup) => ({
            id: tabGroup.id,
            title: tabGroup.title,
        }));

        await createSubMenu(
            tabGroupObjects,
            targetListId,
            "createBookmarksFolder",
            toggleSwitchState
        );
    }
    else {
        toggleSwitchState = false;
        const allTabGroupsInWindow = await getAllTabGroupsInCurrentWindow();
        // Resolving the returned promise to a list of tabObjects
        var tabGroupObjects = await allTabGroupsInWindow.map((tabGroup) => ({
            id: tabGroup.id,
            title: tabGroup.title,
        }));

        await createSubMenu(
            tabGroupObjects,
            targetListId,
            "createBookmarksFolder",
            toggleSwitchState
        );
    }
});

export async function createBookmarksFolder(groupId) {
    const folderTitle = await getFolderTitle();

    if (folderTitle != null) {
        // get tabs in the selected tab group by checking if a tab is attached to groupId
        const allTabsInCurrentWindow = await getAllTabsInCurrentWindow();
        var tabsInSelectedTabGroup = [];
        allTabsInCurrentWindow.forEach((tab) => {
            if (tab.groupId == groupId) {
                tabsInSelectedTabGroup.push(tab);
            }
        });

        await chrome.bookmarks.create({ title: folderTitle, parentId: '1' }, async (folder) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            for (const tab of tabsInSelectedTabGroup) {
                await chrome.bookmarks.create({
                    parentId: folder.id,
                    title: tab.title,
                    url: tab.url,
                });
            }
        });

        console.log(folderTitle);
        console.log(groupId);
    }
}
