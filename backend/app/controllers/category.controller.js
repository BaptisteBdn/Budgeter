const { sequelize, category } = require("../models");
const db = require("../models");
const Category = db.category;

// Create and Save a new cateogry
exports.create = (req, res) => {
    // Validate request

    if (!req.body.category || !req.body.subcategory) {
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

exports.updateCategory = (req, res) => {
    if (!req.body.category || !req.body.subcategory) {
        res.status(400).send({
            message: "Content needs category and subcategory!"
        });
        return;
    }

    sequelize.query(`UPDATE categories SET category = '${req.body.category}' WHERE category = '${req.params.category}'`)
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};

exports.updateSubCategory = (req, res) => {
    if (!req.body.subcategory) {
        res.status(400).send({
            message: "Content needs subcategory !"
        });
        return;
    }

    Category.update(req.body, {
        where: {
            category: req.params.category,
            subcategory: req.params.subcategory
        }
    })
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the category."
            });
        });
};

exports.delete = (req, res) => {
    // Validate request

    if (!req.body.category || !req.body.subcategory) {
        res.status(400).send({
            message: "Content needs category and subcategory!"
        });
        return;
    }

    Category.destroy({
        where: {
            category: req.body.category,
            subcategory: req.body.subcategory
        }
    })
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the category."
            });
        });
};

exports.findAll = (req, res) => {
    return Category.findAll(
        {
            attributes: ['category', [sequelize.literal('array_agg(subcategory ORDER BY subcategory)'), 'subcategories']],
            group: [['category']],
            order: [['category']],
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