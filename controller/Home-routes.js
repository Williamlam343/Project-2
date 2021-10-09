const router = require('express').Router();
const { Watchlist, Favorite, User } = require('../models');
const axios = require("axios")
const withAuth = require('../utils/withAuth');
require("dotenv").config()

router.get("/login", async (req, res) => {
  res.render("login")
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/", (req, res) => {

  if (req.session.result) {

    let result = req.session.result;

    // resets results after each search
    req.session.result = null;
    result.forEach((movie) => {
      if (movie.Poster === "N/A") {
        movie.Poster = null
      }
      movie.Login = req.session.logged_in
    })
    console.log(result)

    res.render("home", {
      result,
      logged_in: req.session.logged_in,
      id: req.session.user_id
    })

  }
  else {
    console.log(req.session.user_id)
    res.render("home", {
      logged_in: req.session.logged_in,
      id: req.session.user_id
    })
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

router.get("/dashboard", withAuth)

router.get("/dashboard/:id", withAuth, async (req, res) => {
  try {
    const movieData = await User.findByPk(req.params.id, {
      include: [{ model: Watchlist }, { model: Favorite }]
    })

    const movies = movieData.toJSON()

    // res.json(movieData.Watchlists)
    let watchlists = movies.Watchlists
    let favorites = movies.Favorites


    res.render("dashboard", {
      watchlists, favorites,
      logged_in: req.session.logged_in,
      id: req.session.user_id
    })
  } catch (error) {
    res.json(error)
  }
})

module.exports = router;