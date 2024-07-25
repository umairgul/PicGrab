let images = document.querySelector("#results");

document.addEventListener("DOMContentLoaded", async function () {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: logImages,
    }, function (results) {
        if (results && results[0]) {
            images.innerHTML = "";
            let fetched = results[0].result;
            fetched.forEach(function (element) {
                images.innerHTML += `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <img src="${element}" class="links" />
                        </div>
                    </div>
                </div>
                `;
            })
        }
    });
});

function logImages() {
    let results = [];

    let imageTags = document.querySelectorAll("img");
    let pictureTags = document.querySelectorAll("pictures");

    if (imageTags.length > 0) {
        imageTags.forEach((element) => {
            results.push(element.src);
        });
    }

    if (pictureTags.length > 0) {
        pictureTags.forEach((element) => {
            let sources = element.querySelectorAll("source");
            sources.forEach((element) => {
                results.push(element.srcset);
            })
        })
    }

    return results;
}