import { getAllTabGroupsInCurrentWindow, getFolderTitle, getAllTabsInCurrentWindow } from "./utils.js";
import { createSubMenu } from "./frontend.js";

var createBookmarksFromGroupButton = document.getElementById(
    "groups-to-bookmarks-folder"
);

createBookmarksFromGroupButton.addEventListener("mouseover", async function () {
    const allTabGroupsInWindow = await getAllTabGroupsInCurrentWindow();
    // Resolving the returned promise to a list of tabObjects
    var tabGroupObjects = await allTabGroupsInWindow.map((tabGroup) => ({
        id: tabGroup.id,
        title: tabGroup.title,
    }));

    await createSubMenu(
        tabGroupObjects,
        "groups-to-bookmarks-folder-menu",
        "createBookmarksFolder"
    );
});

export async function createBookmarksFolder(groupId) {
    const folderTitle = await getFolderTitle();

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

// // create bookmarks folder for the tab group when it's list item is clicked
// export async function makeBookmarksFolder(li, tabGroup) {
//   li.addEventListener("click", () => {
//     chrome.tabs.query({groupId: tabGroup.id}, (tabs) => {
//       var titleCheck = tabGroup.title;
//       if (titleCheck == "") {
//         // if tab group is untitled then promp the user for a name
//         titleCheck = prompt("Enter a name for your bookmarks folder: ", "My bookmarks");
//         if (titleCheck == null || titleCheck == "") {
//           alert("Folder name cannot be empty!");
//           return;
//         }
//       }
//       // create a bookmarks folder
//       chrome.bookmarks.create( {title: titleCheck, parentId: "1"}, (folder) => {
//         const urls = tabs.map(url => url.url);
//         for (const url of urls) {
//           chrome.bookmarks.create({parentId: folder.id, title: "Bookmark", url});
//         }
//       });
//     });

//   });
// }
