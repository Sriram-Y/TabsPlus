import {  getTabIds, getTabTitles, getTabGroupTitles, getAllTabGroupsInCurrentWindow } from './utils.js';
import { renameTab } from './rename-tab.js';
import { makeBookmarksFolder } from './create-bookmarks-from-groups.js';

// Creates a main menu for renaming tabs.
// It retrieves tab titles and tab IDs, and allows the user to rename each tab by clicking on the menu items.
function createMainMenu() {
  // Get the main menu element with the ID 'rename-tab'
  const mainMenu = document.getElementById('rename-tab');

  // Retrieve tab titles using the getTabTitles function
  getTabTitles()
    .then(tabTitlesList => {
      // Iterate over the tab titles
      tabTitlesList.forEach((title, index) => {
        // Create a new menu item element
        const menuItem = document.createElement('h5');
        // Set the text content of the menu item to the current tab title
        menuItem.textContent = title;
        // Add a click event listener to the menu item
        menuItem.addEventListener('click', () => {
          // Prompt the user to enter a new title for the tab
          const newTitle = prompt("Rename Tab: ");
          // Retrieve tab IDs using the getTabIds function
          getTabIds()
          .then(tabIdsList => {
            // Get the specific tab ID based on the current index
            const specificTabId = tabIdsList[index];
            // Call the renameTab function to rename the tab with the new title
            renameTab(newTitle, specificTabId);
            // Update the text content of the menu item to the new title
            menuItem.textContent = newTitle;
          });
        });
        // Append the menu item to the main menu
        mainMenu.appendChild(menuItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// Call the createMainMenu function to create the main menu for renaming tabs
createMainMenu();

function tabGroupsTitle() {
  const groupMenu = document.getElementById('main-menu');
  

  getTabGroupTitles()
    .then(tabGroupsTitle => {
      tabGroupsTitle.forEach(title => {
        const menuItem = document.createElement('h5');
        menuItem.textContent = title;
        menuItem.addEventListener('click', () => {
          // Add your logic here for handling the click event
          console.log('it works')
        });
        groupMenu.appendChild(menuItem);
      });
    })
    .catch(error => {
      console.error(error);
    });

}

tabGroupsTitle();

// Add a mouseover event listener to display the main menu items
const button = document.getElementById('renameATab');
const mainMenu = document.getElementById('rename-tab');
const buttonContainer = document.getElementById('button-container');
const groupTab = document.getElementById('groupsToBookmarksFolder');
const groupMenu = document.getElementById('main-menu');
button.addEventListener('mouseover', () => {
mainMenu.style.display = 'block';
});

// Add a mouseleave event listener to hide the main menu items once leaving container
buttonContainer.addEventListener('mouseleave', () => {
    mainMenu.style.display = 'none';
});

groupTab.addEventListener('mouseover', () => {
  groupMenu.style.display = 'block';
  });

  buttonContainer.addEventListener('mouseleave', () => {
    groupMenu.style.display = 'none';
});

/* 
  DISPLAY: Bookmarks Folder from Tab Groups 
*/

const groupBookmarkContainer = document.getElementById("groupBookmarkContainer"); 
const list = document.getElementById("menu-content");

// get titles of open tab groups and display in submenu
groupBookmarkContainer.addEventListener('mouseenter', () => {
  // call the utils function to get all open tab groups and assign to variable
  const tabGroups = getAllTabGroupsInCurrentWindow();
  // clear the submenu 
  list.innerHTML = "";
  // iterate through all open tab groups and create a list item for each
  tabGroups.then((result) => {
    // check if there are any open tab groups
    if (result.length > 0) {
      for (const tab of result) {
        const li = document.createElement("li");
        // check if tab group is unnamed
        if (tab.title == "") {
          // assign the tab group a default name of id and color if unnamed
          li.textContent = `Group ID: ${tab.id} Color: ${tab.color}`;
        }
        else {
          li.textContent =  `${tab.title}`;
        }
        li.style.cursor = "pointer"; 
        // give each list item an event listener to handle creating a bookmark folder on click 
        makeBookmarksFolder(li, tab);
        list.append(li);
      }
    }
    // alert the user if there are no open tab groups
    else {
      const li = document.createElement("li");
      li.textContent = "No tab groups open";
      list.appendChild(li);
    }
  })
});

// clear the sub menu on mouse leave
groupBookmarkContainer.addEventListener("mouseleave", () => {
  list.innerHTML = "";
});