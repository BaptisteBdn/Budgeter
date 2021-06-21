const { sequelize, category } = require("../models");
const db = require("../models");
const Transaction = db.transactions;

exports.findTotalByCategories = (req, res) => {
    return Transaction.findAll(
        {
            attributes: ['category', [sequelize.literal('sum(debit)'), 'total']],
            group: [['category']],
            order: [['category']],
            raw: true,
            where: { userId: req.userId }
        }
    )
        .then(data => {
            let categories = [];
            let totals = [];
            data.forEach(element => {
                categories.push(element.category);
                totals.push(element.total);
            });
            let payload = {
                categories: categories,
                totals: totals
            }

            res.send(payload);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};