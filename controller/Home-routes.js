const router = require('express').Router();
const { Movie } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbMovieData = await Movie.findAll({
      include: [
        {
          model: Movie,
          attributes: ['title', 'genre', 'description'],
        },
      ],
    });

    res.render('homepage', {
      movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;