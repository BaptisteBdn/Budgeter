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


exports.getFamily = (req, res) => {
    User.find({ familyId: familyId }, {
        where: { id: req.userId }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
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

