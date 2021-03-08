const db = require("../models");
const { Op } = require("sequelize");
const userController = require("../controllers/user.controller");
const transactionController = require("../controllers/transaction.controller");
const Transaction = db.transactions;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (!req.body.credit && !req.body.debit) {
        res.status(400).send({
            message: "Content needs credit or debit!"
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
        order: [
            ['date', 'DESC'],
            ['id', 'DESC']
        ]
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

exports.findAllFromUser = (req, res) => {
    Transaction.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        order: [
            ['date', 'DESC'],
            ['id', 'DESC']
        ],
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


// Retrieve all Transactions for specified users.
exports.getTransactionsUsers = (req, res, users, attributes) => {
    return Transaction.findAll({
        attributes: attributes,
        where: {
            userId: {
                [Op.or]: users
            }
        },
        raw: true
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transactions."
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

// Get the balance between all the users
exports.getBalance = (req, res) => {
    userController.getUsersInfos(req, res)
        .then(usersInfo => {
            let users = new Map();
            usersInfo.forEach(member => users.set(member.id, new UserBalance(member.username)));
            const attributes = ['credit', 'debit', 'who', 'userId']
            transactionController.getTransactionsUsers(req, res, usersInfo.map(user => user.id), attributes)
                .then(transactions => {
                    transactions.forEach(transaction => {
                        if (transaction.debit != null) {
                            if (transaction.who.length === 0 || transaction.who.length === 1 && transaction.who[0] === transaction.userId) {
                                return;
                            }
                            users.get(transaction.userId).addTotalPayed(transaction.debit);
                            transaction.who.forEach(userId => {                            
                                users.get(userId).addTotalToPay(transaction.debit / transaction.who.length)
                            }

                            );
                        }
                    });
                    res.send({ users: [...users] });
                });
        })
}

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


class UserBalance {
    constructor(username) {
        this.username = username;
        this.totalPayed = 0;
        this.totalToPay = 0;
    }

    substractTotalPayed(amount) {
        this.totalPayed -= amount;
    }

    addTotalPayed(amount) {
        this.totalPayed += amount;
    }

    addTotalToPay(amount) {
        this.totalToPay += amount;
    }
}