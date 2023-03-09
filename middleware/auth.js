const passport = require("../helpers/passport");
const isAuthenticated = function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return res.redirect("/get-started");
        }
        if (!user) {
            return res.redirect("/get-started");
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.redirect("/get-started");
            }
            return next();
        });
    })(req, res, next);
};

module.exports = isAuthenticated;
