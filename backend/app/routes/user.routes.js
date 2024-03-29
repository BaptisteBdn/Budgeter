const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/api/user', [authJwt.verifyToken], router);

      // Retrieve all Transaction
    router.get("/usernames", user.getUsernames);
};
