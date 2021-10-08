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


module.exports = router;