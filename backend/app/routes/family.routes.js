const { authJwt, verifyFamily } = require("../middleware");
const family = require("../controllers/family.controller");
var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/api/family', [authJwt.verifyToken], router);

    // Create a new family
    router.post("/", [verifyFamily.checkDuplicateFamilyName], family.create);

    // Retrieve all family
    router.get("/", family.findAll);

    // Delete a family
    router.delete("/:id", family.delete);

};
