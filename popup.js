let fetchButton = document.querySelector("#fetchBtn");
let images = document.querySelector("#results");

fetchButton.addEventListener("click", async function () {
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

    imageTags = document.querySelectorAll("img");

    imageTags.forEach((element) => {
        results.push(element.src);
    });

    return results;
}