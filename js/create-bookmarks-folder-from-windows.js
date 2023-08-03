import { getAllTabsInCurrentWindow } from "./utils.js";

// Add onclick event to trigger the method
const button = document.getElementById("windowToBookmarksFolder");
button.addEventListener("click", createBookmarkFromWindow);

//performative method called once createbookmark is clicked
async function createBookmarkFromWindow() {
  const allTabsInWindow = await getAllTabsInCurrentWindow();

  // Prompt user for folder name
  const folderName = prompt("Enter the name of the bookmark folder:", "My Tabs Folder");
  if (folderName == null || folderName == "") {
    alert("Folder name cannot be empty!");
    return;
  }

  // Create a bookmarks folder with the tabs
  chrome.bookmarks.create(
    { 
      'title': folderName, 
      'parentId': '1' 
    }, 
    function (newFolder) {
      allTabsInWindow.forEach(function (tab) {
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
