module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transactions", {
      date: {
        type: DataTypes.DATEONLY
      },
      credit: {
        type: DataTypes.FLOAT
      },
      debit: {
        type: DataTypes.FLOAT
      },
      account: {
        type: DataTypes.STRING
      },
      destination: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      subcategory: {
        type: DataTypes.STRING
      },
      comment: {
        type: DataTypes.TEXT
      },
      who: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    });
  
    return Transaction;
  };