import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from unique import extensionId
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.action_chains import ActionChains
from inputUrls import urls2
# Set the path to your ChromeDriver executable
webdriver_service = Service('/usr/local/bin/chromedriver')

extensionPath = "./"
# Configure Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--load-extension=' + extensionPath)
chrome_options.add_argument('--disable-extensions-except=./')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--headless=new')  

# Create a new instance of Chrome WebDriver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)


# navigate to extension 
driver.get('chrome-extension://kjdkhbloaajgmkmcppnfnhjoedkddhpb/index.html')
print("Opening Tabs")
## Input URLs ##

for url in urls2: 
    # Open tabs 
    driver.execute_script("window.open()")
    driver.switch_to.window(driver.window_handles[-1])
    driver.get(url)
    print(f"Tab: {url} opened")
driver.switch_to.window(driver.window_handles[0])
time.sleep(1)
print("Making Tab Groups")
group_script = """
      chrome.tabs.query({ url: ['https://www.facebook.com/',
    'https://www.amazon.com/',
    'https://www.netflix.com/',
    'https://www.instagram.com/',
    'https://www.twitter.com/',
    'https://www.linkedin.com/',
    'https://www.reddit.com/',
    'https://www.pinterest.com/',
    'https://www.stackoverflow.com/',
    'https://www.quora.com/',
    'https://www.spotify.com/',
    'https://www.microsoft.com/',
    'https://www.apple.com/',
    'https://www.yahoo.com/',
    'https://www.twitch.tv/',
    'https://www.aliexpress.com/',
    'https://www.wikipedia.org/',
    'https://www.netflix.com/',
    'https://www.linkedin.com/',
    'https://www.reddit.com/',
    'https://www.gmail.com/',
    'https://www.wordpress.com/',
    'https://www.tumblr.com/',
    'https://www.dropbox.com/',
    'https://www.slack.com/',
    'https://www.salesforce.com/',
    'https://www.alibaba.com/',
    'https://www.nike.com/',
    'https://www.cnn.com/',
    'https://www.bbc.co.uk/',
    'https://www.nytimes.com/',
    'https://www.huffpost.com/',
    'https://www.techcrunch.com/',
    'https://www.bleacherreport.com/',
    'https://www.wikipedia.org/',
    'https://www.imdb.com/',
    'https://www.tripadvisor.com/',
    'https://www.zillow.com/',
    'https://www.zara.com/',
    'https://www.bestbuy.com/',
    'https://www.target.com/',
    'https://www.walmart.com/',
    'https://www.costco.com/',
    'https://www.macys.com/',
    'https://www.kohls.com/',
    'https://www.sephora.com/',
    'https://www.ulta.com/',
    'https://www.starbucks.com/',
    'https://www.mcdonalds.com/',
    'https://www.coca-cola.com/',
    'https://www.pepsi.com/',
    'https://www.whitehouse.gov/',
    'https://www.nasa.gov/',
    'https://www.un.org/',
    'https://www.github.io/',
    'https://www.mozilla.org/'] }, (tabs) => {
         const tabIds = tabs.map(tab => tab.id);
         chrome.tabs.group({ tabIds: tabIds }, (group) => {
         });
      });
"""

driver.execute_script(group_script)
time.sleep(1)

print("Pressing Feature Button")
# Find and click feature button
button = driver.find_element(By.ID, "groupsToBookmarksFolder")
actions = ActionChains(driver)
actions.move_to_element(button).perform()
driver.save_screenshot("./test-docs/Test-2-Results/tab_groups_list.png")
time.sleep(1)
print("Making Bookmark Folder(s)")
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
   
   alert = Alert(driver)
   time.sleep(1)
   # Accept the confirmation dialog by clicking "OK"
   alert.accept()
   time.sleep(1)
print("Bookmark Groups Created Successfully")
confirmBookmarks = """ 
   const getBookmarkBarBookmarks = () => {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        const bookmarkBar = bookmarkTreeNodes[0].children[0]; 
        const bookmarkBarBookmarks = bookmarkBar.children;
        const urls = [];
        bookmarkBarBookmarks.forEach(item => {
          if (item.children) {
            item.children.forEach(child => {
              urls.push({url: child.url, parentId: child.parentId});
            });
          }
        });
         resolve(urls);
      });
    });
  }
  return getBookmarkBarBookmarks();
"""

testResult = driver.execute_script(confirmBookmarks)

print(testResult)

driver.get("chrome://bookmarks")
driver.save_screenshot("./test-docs/Test-2-Results/bookmark_bar_folders_created.png")
time.sleep(5)
# Close the browser
driver.quit()

print("Creating Test Doc")
# make test result file
testResultFile = open("./test-docs/Test-2-Results/test2output.txt", "w")
testResultFile.write(f"Expected Urls: {str(list(urls))}\n")
testResultFile.write(f"Actual Output: {str(list(testResult))}")
testResultFile.close
