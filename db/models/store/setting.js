const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      addSetting: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("addSetting");
          let res = null;
          if (rawValue) {
            try {
              res = JSON.parse(rawValue)
            } catch (err) {
              console.err(`JSON for "addSetting" is not valid`, err)
              res = null
            }
          }
          return res
        },
        set(value) {
          this.setDataValue('addSetting', JSON.stringify(value))
        },
      },
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
