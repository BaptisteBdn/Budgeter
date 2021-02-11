const { authJwt } = require("../middleware");
const transactions = require("../controllers/transaction.controller.js");
var router = require("express").Router();

module.exports = app => {  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.use('/api/transactions', [authJwt.verifyToken], router);
  
    // Create a new Transaction
    router.post("/", transactions.create);
  
    // Retrieve all Transaction
    router.get("/", transactions.findAll);
  
    // Retrieve a single Transaction with id
    router.get("/:id", transactions.findById);
  
    // Update a Transaction with id
    router.put("/:id", transactions.update);
  
    // Delete a Transaction with id
    router.delete("/:id", transactions.delete);
  
    // Delete all Transaction
    router.delete("/", transactions.deleteAll);
  };
  