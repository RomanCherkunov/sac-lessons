const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      price: DataTypes.TEXT,
      count: DataTypes.TEXT,
      full: {
        type: DataTypes.VIRTUAL,
        get(){
          const count = this.getDataValue("count") ?? 0
          const price = this.getDataValue("price") ?? 0
          return count * price
        }
      }
    },
    defOptions
  );

  model.associate = (models) => {
    model.belongsTo(models.store, {
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};
