const router = require('express').Router();

const movie = require("./Movie-routes")
const user = require("./User-routes")


router.use("/movie", movie)
router.use("/user", user)


module.exports = router;