urls = [
    "https://www.google.com/gmail/about/",
    "https://chat.openai.com/auth/login",
    "https://youtube.com/",
    "https://google.com/",
    "https://github.com/",
    "https://vscode.dev/"
]

urls.forEach(function(url) {
    chrome.tabs.create({ url: url });
    console.log(url);
});
