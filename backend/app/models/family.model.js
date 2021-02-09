module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define("families", {
        name: {
            type: DataTypes.STRING
        }
    });

    return Family;
};