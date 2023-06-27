
import { getTabTitles } from './utils.js';
import { getTabGroupTitles } from './utils.js';

function createMainMenu() {
    const mainMenu = document.getElementById('rename-tab');
    
  
    getTabTitles()
      .then(tabTitlesList => {
        tabTitlesList.forEach(title => {
          const menuItem = document.createElement('h5');
          menuItem.textContent = title;
          menuItem.addEventListener('click', () => {
            // Add your logic here for handling the click event
            console.log('it works')
          });
          mainMenu.appendChild(menuItem);
        });
      })
      .catch(error => {
        console.error(error);
      });
  
  }
  
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





