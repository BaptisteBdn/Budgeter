module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("categories", {
        category: {
            type: DataTypes.STRING
        },
        subcategory: {
            type: DataTypes.STRING
        }
    });

    return User;
};