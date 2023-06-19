###############################################################################
# Author: Sriram Yadavalli
# Date: 6-12-2023
# Description: Test for close duplicate tabs feature. Some tabs in the windows 
# are opened twice. Some are opened once. Expected behavior is that there is a 
# single instance of the inital tabs remaining.
###############################################################################

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import os

from unique import EXTENSION_UNIQUE_ID

print("\n" + os.path.basename(__file__) + " is running...")

unpackedExtensionPath = "../../"
# extensionUniqueID will be different for everyone. Change before running.
# Create a new file called unique.py in the test directory of the project.
# Do not commit unique.py
extensionUniqueId = EXTENSION_UNIQUE_ID
extensionUrl = "chrome-extension://{}/{}".format(extensionUniqueId, "index.html")

chrome_options = Options()
chrome_options.add_argument("--load-extension=" + unpackedExtensionPath);
chrome_options.add_argument("--headless=new")

driver = webdriver.Chrome(options=chrome_options)

# This is where the tabs you want to open will go
urls = [
    "https://www.google.com/gmail/about/",
    "https://www.google.com/gmail/about/",
    "https://chat.openai.com/auth/login",
    "https://youtube.com/",
    "https://github.com/",
    "https://google.com/",
    "https://github.com/",
    "https://vscode.dev/"
]

# Expected state
expectedUrlsInWindow = [
    extensionUrl, # Take into account extension tab
    "https://www.google.com/gmail/about/",
    "https://chat.openai.com/auth/login",
    "https://www.youtube.com/",
    "https://github.com/",
    "https://www.google.com/",
    "https://vscode.dev/",
]

# Opening the extension as first tab
driver.get(extensionUrl)

# Opening all the urls in the url list in separate tabs
for url in urls:
    driver.execute_script("window.open('{}')".format(url))
    time.sleep(1)

# Switch to first tab (which is the extension tab)
driver.switch_to.window(driver.window_handles[0])

time.sleep(1)

# Feature execution
# Set the maximum wait time in seconds
wait = WebDriverWait(driver, 10)
# Wait until the element with the specified locator exists
extensionButton = wait.until(EC.presence_of_element_located((By.ID, "closeDuplicates")))
extensionButton.click()
time.sleep(1)
# Confirming warning
Alert(driver).accept()

time.sleep(1)

actualUrlsInWindow = []
for handle in driver.window_handles:
    driver.switch_to.window(handle)
    actualUrlsInWindow.append(driver.current_url)
    time.sleep(1)

# Having these prints is important for debugging your test cases
# Sometimes the feature might behave properly but you might miss adding a 
# "www" because copying from the url bar is not the same as accessing it 
# through driver.current_url and some things might be different about the 
# url than you expected. Modify your expected output as needed.
print("\nEXPECTED")
expectedUrlsInWindow.sort()
for url in expectedUrlsInWindow:
    print(url)

print("\nACTUAL")
actualUrlsInWindow.sort()
for url in actualUrlsInWindow:
    print(url)

if expectedUrlsInWindow == actualUrlsInWindow:
    print("\n*****" + os.path.basename(__file__) + ": PASSED*****")
else:
    print("\n*****" + os.path.basename(__file__) + ": FAILED*****")

time.sleep(1)
driver.quit()