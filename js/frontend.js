import { createBookmarksFolder } from "./create-bookmarks-from-groups.js";

export async function createSubMenu(objects, targetListId, functionDirector) {
    const subMenuElement = document.getElementById(targetListId);
    subMenuElement.innerHTML = "";
    if (objects != null) {
        objects.forEach(async function (obj) {
            const listItem = document.createElement("li");

            listItem.id = "item";

            listItem.className = targetListId + "-items";

            listItem.style.textAlign = "left";
            listItem.style.listStyle = "none";
            listItem.style.padding = "5px";
            listItem.style.fontSize = "13px";

            listItem.textContent = obj.title;

            listItem.onmouseover = function () {
                // Add a CSS class to apply the blinking animation
                listItem.classList.add("blinking");
                listItem.style.color = "blue";
                listItem.style.cursor = "pointer";
            };
            listItem.onmouseout = function () {
                // Add the blinking class back on mouseout
                listItem.classList.remove("blinking");
                listItem.style.color = "";
            };

            switch (functionDirector) {
                case "createBookmarksFolder":
                    listItem.addEventListener("click", async function () {
                        createBookmarksFolder(obj.id);
                    });
                    break;
                default:
                    console.log("No function with name " + functionDirector + " exists");
                    break;
            }

            subMenuElement.appendChild(listItem);
        });
    }
    else {
        const listItem = document.createElement(li);
        listItem.id = "item";

        listItem.style.textAlign = "left";
        listItem.style.listStyle = "none";
        listItem.style.padding = "5px";
        listItem.style.color = "red";
        listItem.style.fontSize = "13px";

        listItem.textContent = "None found.";

        subMenuElement.appendChild(listItem);
    }

    subMenuElement.style.display = "block";
}
