import { getAllTabsInCurrentWindow } from "./utils.js";

// Add onclick event to trigger the method
const button = document.getElementById("windowToBookmarksFolder");
button.addEventListener("click", createBookmarkFromWindow);

async function createBookmarkFromWindow() {
  const allTabsInWindow = await getAllTabsInCurrentWindow();

  // Create a bookmarks folder with the tabs
  chrome.bookmarks.create(
    { 
      'title': 'My Tabs Folder', 
      'parentId': '1' 
    }, 
    function (newFolder) {
      allTabsInWindow.forEach(function (tab) {
        console.log("Hello, World!");

        chrome.bookmarks.create(
          { 
            'parentId': newFolder.id, 
            'title': tab.title, 
            'url': tab.url 
          }
        );
      });
    }
  );
}