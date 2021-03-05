const { authJwt } = require("../middleware");
const category = require("../controllers/category.controller");
var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/api/categories', [authJwt.verifyToken], router);

    router.post("/", category.create);

    // Retrieve all categories
    router.get("/", category.findCategories);

    // Retrieve all subcategories from a category
    router.get("/:category", category.findAllSubcategoriesFromCategories);
};
