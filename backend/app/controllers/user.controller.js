const { family } = require("../models");
const db = require("../models");
const User = db.user;

exports.addFamily = (req, res) => {
    const familyId = req.params.id;
    User.update({ familyId: familyId }, {
        where: { id: req.userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Return the familyId of the current user
exports.getCurrentUserInfos = (req, res) => {
    return User.findAll({
        where: { id: req.userId },
        raw: true
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        });
};


// Get users infos from the same family
exports.getFamilyUsers = (req, res, familyId) => {
    return User.findAll({
        attributes: ['id', 'username'],
        where: { familyId: familyId },
        raw: true
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        });
}

// Return the userId of the family of the current user
exports.getFamilyUsersFromCurrentUser = (req, res) => {
    return this.getFamilyFromCurrentUser(req, res).then(family => {
        return User.findAll({
            attributes: ['id'],
            where: { familyId: family[0].familyId },
            raw: true
        })
            .then(data => {
                return data;
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving user."
                });
            });
    });
};

exports.removeFamily = (req, res) => {
    User.update({ familyId: null }, {
        where: { id: req.userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

