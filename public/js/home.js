// OMDB apikey
require("dotenv").config()
//TODO: how to use dotenv to protect our apikeys
const APIKEY = "2aaebd7b"
const formHandler = document.querySelector("#form-handler")

function titleSearch(e) {
    e.preventDefault();
    // listens for search bar
    let title = document.querySelector("#search-text").value.trim();

    let searchQuery = {
        // search title
        s: title,
        apikey: APIKEY,
    }

    // if something is searched runs the fetch function
    if (title.length) {
        searchMovie(searchQuery)
    }
}

async function searchMovie(params) {
    let queryString = new URLSearchParams(params)
    let URL = `http://www.omdbapi.com/?${queryString}`
    let search = (await (await fetch(URL)).json())

    // if search results has movies return first 5 movies
    if (search.length) {
        const imdbTDArr = []
        // grabs first 5 movie imdb IDs
        for (let i = 0; i < 5; i++) {
            imdbTDArr.push(search.Search[i].imdbID)
        }

        const requests = imdbTDArr.map(
            async (id) =>
                (
                    await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
                ).json()
        );

        // sends req to fetch all movies be id
        // TODO: how would I render these straight into handlebar? or would I send them to controller?

        Promise.all(requests).then(
            (res) => console.log(res)
        )
    }
    else {
        console.log(`Could not find any movies!}`)
    }

}


formHandler.addEventListener("submit", titleSearch)