const db = require("../models");
const Category = db.category;

// Create and Save a new cateogry
exports.create = (req, res) => {
    // Validate request

    if (!req.body.category && !req.body.subcategory) {
        res.status(400).send({
            message: "Content needs category and subcategory!"
        });
        return;
    }

    const category = {
        category: req.body.category,
        subcategory: req.body.subcategory,
    };

    Category.create(category)
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};

exports.findAll = (req, res) => {
    return Category.findAll(
        {
            attributes: ['category', 'subcategory'],
            order: [
                ['category'],
                ['subcategory']
            ],
            raw: true
        }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.findCategories = (req, res) => {
    return Category.findAll(
        {
            attributes: ['category'],
            order: [
                ['category']
            ],
            raw: true
        }
    )
        .then(data => {
            res.send([...new Set(data.map((c) => c.category)),
              ]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.findAllSubcategoriesFromCategories = (req, res) => {
    return Category.findAll(
        {
            attributes: ['subcategory'],
            where: { category: req.params.category },
            order: [
                ['subcategory']
            ],
            raw: true
        }
    )
        .then(data => {
            res.send(data.map(category => category.subcategory));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};