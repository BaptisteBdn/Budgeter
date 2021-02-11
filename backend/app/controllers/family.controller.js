const db = require("../models");
const Family = db.family;
const userController = require("../controllers/user.controller");
const transactionController = require("../controllers/transaction.controller");
const { user, family } = require("../models");

exports.create = (req, res) => {
    Family.create({
        name: req.body.name,
    })
        .then(
            res.send({ message: "Family was created successfully!" })
        )
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    Family.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Family with id=" + id
            });
        });
};

// Get the balance between the family members
exports.getBalance = (req, res) => {
    userController.getCurrentUserInfos(req, res)
        .then(currentUser => {
            userController.getFamilyUsers(req, res, currentUser[0].familyId)
                .then(family => {
                    let users = new Map();
                    family.forEach(member => users.set(member.id, new UserBalance(member.username)));
                    const attributes = ['credit', 'debit', 'who', 'userId']
                    transactionController.getTransactionsUsers(req, res, family.map(user => user.id), attributes)
                        .then(transactions => {
                            transactions.forEach(transaction => {
                                if (transaction.debit != null) {
                                    users.get(transaction.userId).addTotalPayed(transaction.debit);
                                    transaction.who.forEach(userId =>
                                        users.get(userId).addTotalToPay(transaction.debit / transaction.who.length)
                                    );
                                }
                            });
                            res.send({ users: [...users] });
                        });
                })
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Family.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Family was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Family with id=${id}. Maybe Family was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Family with id=" + id
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
