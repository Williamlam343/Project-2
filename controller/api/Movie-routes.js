const router = require('express').Router();
const { Movie } = require('../models');
const withAuth = require('../utils/auth');

router.get('/movie/:id', withAuth, async (req, res) => {
  try {
    const dbMovieData = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: Movie,
          attributes: [
            'id',
            'title',
            'release_date',
            'created_date',
            'reviews',
            'genre',
            'description',
          ],
        },
      ],
    });

    const gallery = dbMovieData.get({ plain: true });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;