const db = require("../models");
const Family = db.family;

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