chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let elements = document.querySelectorAll("input");

        if (request.method === "autocompleteOn") {
            autocompleteOn(elements)
            console.log("autocompleteOn DONE");
            sendResponse({text: document.body.innerText, method: "autocompleteOn"});
        }

        if (request.method === "passwordToText") {
            passwordToText(elements)
            console.log("passwordToText DONE");
            sendResponse({text: document.body.innerText, method: "passwordToText"});
        }
    }
);

function autocompleteOn(elements) {
    for (const element of elements) {
        element.autocomplete = "on";
    }
}

function passwordToText(elements) {
    for (const element of elements) {
        if (element.type === "password") {
            element.type = "text";
        }
    }
}
