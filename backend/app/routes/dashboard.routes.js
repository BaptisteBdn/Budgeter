const { authJwt } = require("../middleware");
const dashboard = require("../controllers/dashboard.controller.js");
var router = require("express").Router();

module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/api/dashboard', [authJwt.verifyToken], router);

    // Retrieve total by categories
    router.get("/categories", dashboard.findTotalByCategories);
};
