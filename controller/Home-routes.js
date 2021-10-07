const router = require('express').Router();
const { Movie } = require('../models');
const axios = require("axios")
// const withAuth = require('../utils/auth');
require("dotenv").config()

router.get("/", async (req, res) => {

  if (req.session.result) {

    let result = req.session.result;
    // req.session.result = null;
    console.log(result)
    res.render("home", { result })

  }
  else {

    res.render("home")
  }

})

router.post('/', async (req, res, next) => {
  try {
    let searchQuery = {
      ...req.body,
      apikey: process.env.APIKEY,
      type: "movie"
    }
    let queryString = new URLSearchParams(searchQuery)
    let URL = `http://www.omdbapi.com/?${queryString}`

    let Moviedata = await axios.get(URL)
    const { data } = Moviedata
    const imdbTDArr = []

    // grabs first 5 movie imdb IDs
    for (let i = 0; i < 5; i++) {
      imdbTDArr.push(data.Search[i].imdbID)
    }

    const requests = imdbTDArr.map(
      (id) =>
      (
        axios.get(`http://www.omdbapi.com/?apikey=${searchQuery.apikey}&i=${id}`)
      )
    );
    // sends req to fetch all movies be id

    let moviesList = await Promise.all(requests)
    req.session.result = moviesList.map((data) => data.data)

    res.redirect("/")
  }
  catch (error) {
    res.json(error)
  }
})


module.exports = router;