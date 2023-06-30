const bookmarkGroupsButton = document.getElementById("groupsToBookmarksFolder");
const list = document.getElementById("menu-content"); // the list of tab groups that pops out when the button is clicked
const container = document.getElementById("groupBookmarkContainer");
let listVisible = false;
let tabGroups = []; // Global Variable for open tab groups

updateTabGroups(); // fetch open tab groups

// Fetch tab groups
function updateTabGroups() {
  chrome.tabGroups.query({}, (groups) => {
    tabGroups = groups; // Get currently open tab groups
  });
}

// ON HOVER - Check for open group tabs - if none then display an alert
container.addEventListener("mouseenter", () => {
  chrome.tabGroups.query({}, (groups) => {
    // check for open tab groups
    if (groups.length > 0) {  
        showTabGroups(groups);    
        tabGroups = groups;
    }
    else {
      list.innerHTML = "";
      const li = document.createElement("li"); 
      li.textContent = "No Tab Groups Open"; 
      list.appendChild(li);   
    }
  })
});

container.addEventListener("mouseleave", () => {
  list.innerHTML = "";
});

// create li for each open tab group and add it to the sublist
function showTabGroups(groups) {
    list.innerHTML = "";
    // create list items for each tab group
    for (const group of groups) {
        const li = document.createElement("li"); 
        li.textContent = `GROUP ID: ${group.title} COLOR: ${group.color}`; 
        if (!group.title == "") {
          li.textContent = `${group .title}`; 
        }
        else {
          li.textContent = `group id:${group.id} color: ${group.color}`
        }
        li.style.cursor = "pointer";      
        makeBookMarksFolder(li, group); // pass in the list item AND the tab group object
        list.appendChild(li);  
    }
}

// the list element will listen for a click then create a bookmark folder 
function makeBookMarksFolder(item, group) {
    item.addEventListener("click", (tabs) => {
        // use the chrome.tabs.query to find which open tabs have matching group id to the one passed in from group parameter
        chrome.tabs.query({groupId: group.id}, (tabs) => {
            // check if the selected tab group has a name - if not then use the color and group id as the folder title
            var titleCheck = group.title;
            if (group.title === "") {
                titleCheck = prompt("Enter bookmark folder name: " , "My Bookmarks");
                console.log(titleCheck);
                if (titleCheck == null || titleCheck == "") {
                  alert("Folder name cannot be empty!");
                  return;
                }               
            }
              // create a new bookmarks folder - it will be displayed on the bookmark bar
              chrome.bookmarks.create({ title: titleCheck, parentId: "1"}, (folder) => {
                  // create an array of urls of the open tabs that match the group id of the group parameter
                  const urls = tabs.map(url => url.url);
                  // make a bookmark and set its parentId to the newly created folder id
                  for (const url of urls) {
                      chrome.bookmarks.create({parentId: folder.id, title: "Bookmark", url});
                  }
              });
        });
    
    })
}

