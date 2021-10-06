// OMDB apikey
//TODO: how to use dotenv to protect our apikeys
const formHandler = document.querySelector("#form-handler")

async function titleSearch(e) {
    e.preventDefault();
    // listens for search bar
    let title = document.querySelector("#search-text").value.trim();

    let searchQuery = {
        // search title
        s: title,
    }

    // if title exists then send a post

    if (title.length) {
        const res = await fetch("/", {
            method: "POST",
            body: JSON.stringify(searchQuery),
            headers: {
                "content-type": "application/json",
            },
        })

        if (res.ok) {
            console.log("post received")
        } else {
            console.log("post failed")
        }

    }

}


formHandler.addEventListener("submit", titleSearch)