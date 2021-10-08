const searchHandler = document.querySelector("#search-handler")
const main = document.querySelector("#main")


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
            document.location.replace('/');
            console.log("post received")
        } else {
            console.log("post failed")
        }

    }

}

async function addToFavorite(movie) {
    const response = await fetch(`/api/movie/favorite`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            "content-type": "application/json",
        },
    });
    if (response.ok) {

        console.log("awesome successful post")
    } else {
        console.log("booo post failed")
    }

}

async function addToWatchlist(movie) {
    const response = await fetch(`/api/movie/watchlist`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            "content-type": "application/json",
        },
    });
    if (response.ok) {

        console.log("awesome successful post")
    } else {
        console.log("booo post failed")
    }
}

function sendToDashboard(e) {
    const button = e.target
    if (button.matches(".add-watchlist")) {
        button.classList.replace("bi-eye", "bi-eye-fill")
        let movie = {
            imdbID: button.getAttribute("data-imdb"),
            poster: button.getAttribute("data-poster"),
            title: button.parentNode.children[0].textContent,
            year: button.parentNode.children[1].children[0].textContent,
            rated: button.parentNode.children[1].children[2].textContent,
            genre: button.parentNode.children[1].children[4].textContent,
            imdbRating: button.parentNode.children[1].children[6].textContent,
            plot: button.parentNode.children[2].textContent,
            // list: false
        }
        console.log(movie)
        addToWatchlist(movie)
    }
    if (button.matches(".add-favorite")) {
        button.classList.replace("bi-heart", "bi-heart-fill")

        let movie = {
            imdbID: button.getAttribute("data-imdb"),
            poster: button.getAttribute("data-poster"),
            title: button.parentNode.children[0].textContent,
            year: button.parentNode.children[1].children[0].textContent,
            rated: button.parentNode.children[1].children[2].textContent,
            genre: button.parentNode.children[1].children[4].textContent,
            imdbRating: button.parentNode.children[1].children[6].textContent,
            plot: button.parentNode.children[2].textContent,
            // list: true
        }

        addToFavorite(movie)
    }
}


main.addEventListener("click", sendToDashboard)
searchHandler.addEventListener("submit", titleSearch)