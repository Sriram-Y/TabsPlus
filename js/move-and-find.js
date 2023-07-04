/*
* Author: Sriram Yadavalli
* Date: 7-4-2023
* Description: This service worker moves  to the tab that is clicked from the
* search all feature. It then executes a find with the user specified string 
* allowing the user to cycle through the found instances of the string.
*/

chrome.runtime.onMessage.addListener(async function (message) {
    const [id, searchString] = message.message;
    console.log("Received data:", id, searchString);
    await move(id, searchString);
});

async function move(tabId, searchString) {
    const moveComplete = await chrome.tabs.update(tabId, { active: true });
    await moveComplete;
    console.log("Move Complete:", moveComplete);

    // Simulating find operation on page
    // const injectionResults = await chrome.scripting.executeScript({
    //     target: { tabId: tabId, allFrames: true },
    //     func: simulateCtrlF,
    // });
    // for (const { frameId, result } of injectionResults) {
    //     console.log(`Frame ${frameId} Result:`, result, "Tab ID:", tabId);
    // }
}

// function simulateCtrlF() {
//     // Create a new KeyboardEvent for the Command key
//     const cmdKeyDown = new KeyboardEvent('keydown', {
//         key: 'Meta',
//         code: 'MetaLeft',
//         metaKey: true,
//         bubbles: true,
//     });

//     // Create a new KeyboardEvent for the F key
//     const fKeyDown = new KeyboardEvent('keydown', {
//         key: 'f',
//         code: 'KeyF',
//         metaKey: true,
//         bubbles: true,
//     });

//     // Dispatch the events in the desired order
//     document.dispatchEvent(cmdKeyDown);
//     document.dispatchEvent(fKeyDown);

//     // Dispatch the keyup events to release the keys
//     const keyUpEvents = new KeyboardEvent('keyup', {
//         key: 'f',
//         code: 'KeyF',
//         metaKey: true,
//         bubbles: true,
//     });

//     document.dispatchEvent(keyUpEvents);
// }
