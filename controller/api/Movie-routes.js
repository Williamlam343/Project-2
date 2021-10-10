const router = require('express').Router();
const { Watchlist, Favorite } = require('../../models');
const withAuth = require("../../utils/withAuth")


router.post("/watchlist", withAuth, async (req, res) => {
  try {

    const movieData = await Watchlist.create({
      ...req.body,
      user_id: req.session.user_id
    })
    console.log("running")
    res.status(200).json(movieData);
  } catch (error) {
    res.status(400).json("failed to create post!")
    console.log(error)

  }
})

router.delete("/watchlist/:id", async (req, res) => {

  try {
    console.log(req.params.id)
    const movieData = await Watchlist.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!movieData) {
      res.status(404).json("movie id not found")
    }
    res.status(200).json("deletion successful")
  } catch (error) {
    res.status(500).json(error)
  }

})


router.post("/favorite", withAuth, async (req, res) => {
  try {
    const movieData = await Favorite.create(
      {
        ...req.body,
        user_id: req.session.user_id
      })
    res.status(200).json(movieData);
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/favorite/:id", async (req, res) => {

  try {
    console.log(req.params.id)
    const movieData = await Favorite.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!movieData) {
      res.status(404).json("movie id not found")
    }
    res.status(200).json("deletion successful")

  } catch (error) {
    res.status(500).json(error)
  }

})


module.exports = router;