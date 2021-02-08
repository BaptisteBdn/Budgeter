module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
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
  
    app.use('/api/transactions', router);
  };
  