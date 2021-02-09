const db = require("../models");
const { Op } = require("sequelize");
const { user } = require("../models");
const Transaction = db.transactions;
const Family = db.family;
const User = db.user;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Transaction
    const transaction = {
        date: req.body.date,
        credit: req.body.credit,
        debit: req.body.debit,
        account: req.body.account,
        destination: req.body.destination,
        category: req.body.category,
        subcategory: req.body.subcategory,
        comment: req.body.comment,
        who: req.body.who,
        userId: req.userId
    };

    // Save Transaction in the database
    Transaction.create(transaction)
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transaction."
            });
        });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
    Transaction.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        where: { userId: req.userId }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transactions."
            });
        });
};

// Retrieve all Transactions from the same family.
exports.findAllFamily = (req, res) => {
    const familyId = req.params.familyId;

    User.findAll({
        attributes: ['id'],
        where: {
            familyId: familyId
        },
        raw: true
    }).then(users => {
        Transaction.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
            where: {
                userId: {
                    [Op.or]: users.map(user => user.id)
                }
            }
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving transactions."
                });
            });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });

};


// Find a single Transaction with an id
exports.findById = (req, res) => {
    const id = req.params.id;

    Transaction.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Transaction with id=" + id
            });
        });
};

// Update a Transaction by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Transaction.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transaction was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transaction with id=" + id
            });
        });
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Transaction.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transaction was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction with id=" + id
            });
        });
};

// Delete all Transaction from the database.
exports.deleteAll = (req, res) => {
    Transaction.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Transaction were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all transactions."
            });
        });
};