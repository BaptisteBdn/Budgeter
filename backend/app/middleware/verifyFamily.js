const db = require("../models");
const Family = db.family;

checkDuplicateFamilyName = (req, res, next) => {
    // Username
    Family.findOne({
        where: {
            name: req.body.name
        }
    }).then(family => {
        if (family) {
            res.status(400).send({
                message: "Failed! Family name is already in use!"
            });
            return;
        }

        next();
    });
};

const verifyFamily = {
    checkDuplicateFamilyName: checkDuplicateFamilyName
};

module.exports = verifyFamily;