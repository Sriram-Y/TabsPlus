import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from unique import extensionId

# Set the path to your ChromeDriver executable
webdriver_service = Service('/usr/local/bin/chromedriver')

extensionPath = "./"
# Configure Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--load-extension=' + extensionPath)
chrome_options = webdriver.ChromeOptions()

chrome_options.add_argument('--disable-extensions-except=./')
chrome_options.add_argument('--disable-dev-shm-usage')

# Add any desired options
# chrome_options.add_argument('--headless')  # Uncomment this line for headless mode

# Create a new instance of Chrome WebDriver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)


driver.get('chrome-extension://pelllebfeloappccljohafhdjpdffokj/index.html')
# Open a webpage

time.sleep(1000)
# Find elements and interact with them
# element = driver.find_element(By.ID, "element_id")
# element.click()

# Close the browser
# driver.quit()
