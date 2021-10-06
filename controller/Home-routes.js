const router = require('express').Router();
const { Movie } = require('../models');
// const withAuth = require('../utils/auth');
require("dotenv").config()

router.get("/", async (req, res) => {
  res.render("home")
})

router.post('/', async (req, res) => {

  try {
    let searchQuery = {
      ...req.body,
      apikey: process.env.APIKEY
    }

    console.log(searchQuery)
    searchMovie(searchQuery)
    function searchMovie(params) {
      let queryString = new URLSearchParams(params)
      let URL = `http://www.omdbapi.com/?${queryString}`
      // let search = (await(await fetch(URL)).json())

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", URL, true)

      // if search results has movies return first 5 movies
      // if (search.length) {
      //   const imdbTDArr = []

      //   // grabs first 5 movie imdb IDs
      //   for (let i = 0; i < 5; i++) {
      //     imdbTDArr.push(search.Search[i].imdbID)
      //   }
      //   const requests = imdbTDArr.map(
      //     async (id) =>
      //       (
      //         await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
      //       ).json()
      //   );

      //   // sends req to fetch all movies be id

      //   Promise.all(requests).then(
      //     (res) => console.log(res)

      //   )
      // }
    }

  }
  catch (error) {
    res.json(error)

  }
})
module.exports = router;