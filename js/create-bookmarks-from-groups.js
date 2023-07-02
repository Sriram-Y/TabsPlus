let tabGroups = []; // Global Variable for open tab groups

updateTabGroups(); // fetch open tab groups

// Fetch tab groups
function updateTabGroups() {
  chrome.tabGroups.query({}, (groups) => {
    tabGroups = groups; // Get currently open tab groups
  });
}

// create bookmarks folder for the tab group when it's list item is clicked
export async function makeBookmarksFolder(li, tabGroup) {
  li.addEventListener("click", () => {
    chrome.tabs.query({groupId: tabGroup.id}, (tabs) => {
      var titleCheck = tabGroup.title;
      if (titleCheck == "") {
        // if tab group is untitled then promp the user for a name
        titleCheck = prompt("Enter a name for your bookmarks folder: ", "My bookmarks");
        if (titleCheck == null || titleCheck == "") {
          alert("Folder name cannot be empty!");
          return;
        }   
      }
      // create a bookmarks folder 
      chrome.bookmarks.create( {title: titleCheck, parentId: "1"}, (folder) => {
        const urls = tabs.map(url => url.url);
        for (const url of urls) {
          chrome.bookmarks.create({parentId: folder.id, title: "Bookmark", url});
        }
      });
    });
    
  });
}

