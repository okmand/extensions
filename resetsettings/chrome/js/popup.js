document.addEventListener("DOMContentLoaded", function () {
    let autocompleteOnButton = document.getElementById("autocompleteOn");
    autocompleteOnButton.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "autocompleteOn"}, function (response) {
                if (response.method === "autocompleteOn") {
                    autocompleteOnButton.disabled = true;
                }
            });
        });
    }, false);
    let passwordToTextButton = document.getElementById("passwordToText");
    passwordToTextButton.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "passwordToText"}, function (response) {
                if (response.method === "passwordToText") {
                    passwordToTextButton.disabled = true;
                }
            });
        });
    }, false);

}, false);