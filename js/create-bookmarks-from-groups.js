const bookmarkGroupsButton = document.getElementById("groupsToBookmarksFolder");
const bookmarkGroupsDiv = document.getElementById("gtbf");
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

bookmarkGroupsDiv.addEventListener("mouseenter", () => {
  chrome.tabGroups.query({}, (groups) => {
    // check for open tab groups
    if (groups.length > 0) {  
        showTabGroups(groups);
        toggleList();
        tabGroups = groups;
    }
    else {
      list.innerHTML = "";
      toggleList();
      const li = document.createElement("li"); // create a list item for each open tab groups
      li.textContent = "No Tab Groups Open"; 
      list.appendChild(li);   
    }
  })
});

bookmarkGroupsDiv.addEventListener("mouseleave", () => {
  list.style.display = "none";
  toggleList();
});

function toggleList() {
    // toggle the visibility of the tabs groups with the groupsToBookmarksFolder button
    if (!listVisible){
        list.style.display = "block";      
        listVisible = true;
    }
    else {
        // hide the list of tab groups when the button is pressed 
        list.style.display = "none";
        listVisible = false;
    }
}

function showTabGroups(groups) {
    list.innerHTML = "";
    // create list items for each tab group
    for (const group of groups) {
        const li = document.createElement("li"); // create a list item for each open tab groups
        li.textContent = `GROUP ID: ${group.id} COLOR: ${group.color}`; 
        li.style.cursor = "pointer";
        const subList = document.createElement("ul");
        subList.innerHTML = "";
        li.addEventListener("mouseover", () => {
          li.style.color = "blue"; // change colors to blue on hover
          
        });
        li.addEventListener("mouseout", () => {
          li.style.color = "black"; // Revert back to original colors on mouseout
          //subList.style.display = "none";
        });
        
        // has formatting issues
        // li.addEventListener("mouseenter", () => { 
        //   subList.style.display = "block";
        //   subList.innerHTML = "";
        //   fetchTitles(group, subList);
        //   li.appendChild(subList);
        // });
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
// Display URLs in a sub-sub menu 
// Has formatting issues and will warp the dimensions of the extension

// function fetchTitles(group, item) {
//   chrome.bookmarks.search({}, (bookmarks) => {
//     console.log(bookmarks);
//     var parentId = "";
//     var urls = [];
//       for (const entry of bookmarks) {
//         if (entry.title.includes(group.id)) {
//             parentId = entry.id;
//             console.log(entry.id);
//         }
        
//       }
//       for (const entry of bookmarks) {
//         if (entry.parentId == parentId) {
//           urls.push(entry.url);
//         }
//       }
//       console.log(urls);
//       for (const url of urls) {
//         const li = document.createElement("li");
//         li.textContent = url;
//         item.appendChild(li);
//       }
//   });
// }
