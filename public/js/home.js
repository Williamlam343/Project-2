const watchlistHandler = document.querySelectorAll(".add-watchlist")
const favoriteHandler = document.querySelectorAll(".add-favorite")
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
            document.location.replace('/');
            console.log("post received")
        } else {
            console.log("post failed")
        }

    }

}

function addToFavorite(e) {
    e.preventDefault();
}

async function addToWatchlist(e) {
    e.preventDefault();
    console.log(this)
    if (e.target.hasAttribute("data-imdb")) {
        const imdbID = e.target.getAttribute("data-imdb")
        const poster = e.target.getAttribute("data-poster")
        const title = this.querySelector(".movie-title").textContent
        const rated = this.querySelector(".movie-rated").textContent
        const genre = this.querySelector(".movie-genre").textContent
        const imdbRating = this.querySelector(".movie-imdbRating").textContent
        const plot = this.querySelector(".movie-plot").textContent


        const response = await fetch(`/api/watchlist/${imdbID}`, {
            method: 'POST',
            body: JSON.stringify({ title, imdbID, rated, genre, imdbRating, plot, poster }),
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
}


watchlistHandler.forEach((btn) => { btn.addEventListener("click", addToWatchlist) })
favoriteHandler.forEach((btn) => { btn.addEventListener("click", addToFavorite) })
formHandler.addEventListener("submit", titleSearch)