const bookmarkGroupsButton = document.getElementById("groupsToBookmarksFolder");
const list = document.getElementById("menu-content"); // the list of tab groups that pops out when the button is clicked

let listVisible = false;
let tabGroups = []; // Global Variable for open tab groups

updateTabGroups(); // fetch open tab groups

// Fetch tab groups
function updateTabGroups() {
  chrome.tabGroups.query({}, (groups) => {
    tabGroups = groups; // Update tabGroups array with open tab groups
    list.style.display = "none";
    console.log(tabGroups);
  });
}

// Event Listener for Hover Functionality of Feature Button
bookmarkGroupsButton.addEventListener("mouseenter", () => {
  chrome.tabGroups.query({}, (groups) => {
    // check for open tab groups
    if (groups.length > 0) {  
        showTabGroups(groups);
        toggleList();
        tabGroups = groups;
    }
    else {
      // alert the user if there are no open tab groups
      list.innerHTML = "";
      toggleList();
      const li = document.createElement("li"); 
      li.textContent = "No Tab Groups Open"; 
      list.appendChild(li);   
    }
  })
});


// Hide the Sublist on mouse out
list.addEventListener("mouseleave", () => {
  list.style.display = "none";
  //toggleList();
});

// turn the list display on and off
function toggleList() {
    // toggle the visibility of the tabs groups sublist
    if (!listVisible){
        list.style.display = "block";      
        listVisible = true;
    }
    else {
        // hide the sublist of tab groups 
        list.style.display = "none";
        listVisible = false;
    }
}

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
          li.textContent = `group id: ${group.id} color: ${group.color}`
        }
        li.style.cursor = "pointer";
        li.addEventListener("mouseover", () => {
          li.style.color = "blue"; // change colors to blue on hover
        });
        li.addEventListener("mouseout", () => {
          li.style.color = "black"; // Revert back to original colors on mouseout
          //subList.style.display = "none";
        });        
        makeBookMarksFolder(li, group); // pass in the list item AND the tab group object
        list.appendChild(li);  
    }
}

function makeBookMarksFolder(item, group) {
    item.addEventListener("click", (tabs) => {
        // use the chrome.tabs.query to find which open tabs have matching group id to the one passed in from group parameter
        chrome.tabs.query({groupId: group.id}, (tabs) => {
            // check if there the tab group has a name - if not then use the color and group id as the folder title
            var titleCheck = group.title;
            if (group.title === "") {
                titleCheck = ` [${group.color}] ${group.id}`;
            }
            if (confirm(`Would you like to make a bookmark folder for: ${titleCheck}?`)) {
              // create a new bookmarks folder - it will be displayed on the bookmark bar
              chrome.bookmarks.create({ title: `${titleCheck}`, parentId: '1'}, (folder) => {
                  // create an array of urls of the open tabs that match the group id of the group parameter
                  const urls = tabs.map(url => url.url);
                  // make a bookmark and set its parentId to the newly created folder id
                  for (const url of urls) {
                      chrome.bookmarks.create({parentId: folder.id, title: "Bookmark", url});
                  }
              });
            }
        });
    
    })
}

