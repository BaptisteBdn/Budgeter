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

    router.delete("/", category.delete);

    router.get("/all", category.findAll);

    // Retrieve only categories
    router.get("/", category.findCategories);

    // Retrieve all subcategories from a category
    router.get("/:category", category.findAllSubcategoriesFromCategories);

    router.post("/:category", category.updateCategory);

    router.post("/:category/subcategory/:subcategory", category.updateSubCategory);
};
