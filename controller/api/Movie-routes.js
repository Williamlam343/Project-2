const router = require('express').Router();
const { Watchlist, Favorite } = require('../../models');
const withAuth = require("../../utils/withAuth")


router.post("/watchlist", withAuth, async (req, res) => {
  try {
    const movieData = await Watchlist.create({
      ...req.body,
      user_id: req.session.user_id
    })
    res.status(200).json(movieData);
  } catch (error) {
    res.status(400).json("failed to create post!")

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



// router.get('/movie/:id', async (req, res) => {
//   try {
//     const dbMovieData = await Movie.findByPk(req.params.id, {
//       include: [
//         {
//           model: Movie,
//           attributes: [
//             'id',
//             'title',
//             'release_date',
//             'created_date',
//             'reviews',
//             'genre',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbMovieData.get({ plain: true });
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;