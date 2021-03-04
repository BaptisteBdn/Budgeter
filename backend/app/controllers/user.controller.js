const { family } = require("../models");
const db = require("../models");
const User = db.user;

exports.getUserInfos = (req, res) => {
    return User.findAll({
        attributes: ['id', 'username'],
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


// Get all users infos
exports.getUsersInfos = (req, res) => {
    return User.findAll({
        attributes: ['id', 'username'],
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

exports.getUsernames = (req, res) => {
    this.getUsersInfos(req, res).then(data => {
        res.send(data.map(function (user) {
            return {
                "id": user.id,
                "username": user.username,
                "currentUser" : user.id === req.userId
            }
        }));
    });


}
