from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert

from unique import EXTENSION_UNIQUE_ID

import time

# Set the path to your ChromeDriver executable
webdriver_service = Service('/usr/local/bin/chromedriver')

extensionPath = "./"
# Configure Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--load-extension=' + extensionPath)
chrome_options.add_argument('--disable-extensions-except=./')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--headless')  

# Create a new instance of Chrome WebDriver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

extensionUniqueId = EXTENSION_UNIQUE_ID
extensionUrl = "chrome-extension://{}/{}".format(extensionUniqueId, "index.html")

# navigate to extension 
driver.get(extensionUrl)

## Input URLs ##
urls = ["https://www.github.com", "https://www.youtube.com", 
        "https://www.google.com/", "https://www.wikipedia.org/", 
        "https://www.etsy.com/", "https://www.dictionary.com/"]

for url in urls: 
    # Open tabs 
    driver.execute_script("window.open()")
    driver.switch_to.window(driver.window_handles[-1])
    driver.get(url)
driver.switch_to.window(driver.window_handles[0])
time.sleep(1)
group_script = """
      chrome.tabs.query({ url: ["https://github.com/", "https://www.youtube.com/"] }, (tabs) => {
         const tabIds = tabs.map(tab => tab.id);
         chrome.tabs.group({ tabIds: tabIds }, (group) => {
         });
      });
      chrome.tabs.query({ url: ["https://www.google.com/", "https://www.wikipedia.org/"] }, (tabs) => {
         const tabIds = tabs.map(tab => tab.id);
         chrome.tabs.group({ tabIds: tabIds }, (group) => {
         });
      });
      chrome.tabs.query({ url: ["https://www.etsy.com/", "https://www.dictionary.com/"] }, (tabs) => {
         const tabIds = tabs.map(tab => tab.id);
         chrome.tabs.group({ tabIds: tabIds }, (group) => {
         });
      });
"""

result = driver.execute_script(group_script)
print(result)
time.sleep(1)

# Find and click feature button
button = driver.find_element(By.ID, "groupsToBookmarksFolder")
button.click()

time.sleep(1)

# loop through 3 group colors and create bookmark folders 
colors = ["blue", "grey", "red"]
for color in colors:
   # Find all list items on the page
   list_items = driver.find_elements(By.TAG_NAME, "li")

   # Iterate through each list item
   for item in list_items:
      
      # Check if the item's text content contains the word "blue"
      if color in item.text:
         # Perform the desired action on the list item (e.g., click on it)
         item.click()
         break  # Optionally, break the loop if you only want to select the first matching item

   # Switch the driver's focus to the confirmation dialog
   time.sleep(1)
   alert = Alert(driver)

   # Accept the confirmation dialog by clicking "OK"
   alert.accept()
   time.sleep(1)

driver.get("chrome://bookmarks")

time.sleep(100)
# Close the browser
# driver.quit()