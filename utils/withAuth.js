const withAuth = (req, res, next) => {

    if (!req.session.logged_in) {
        console.log("login first!")

        res.redirect("/login")

    }
    else {
        next();
    };
};

module.exports = withAuth;