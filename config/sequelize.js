const { Op } = require("sequelize");
const configDB = require("./config.json");

Op.getLike = function () {
  if (configDB.db.dialect === "postgres") {
    return this.iLike;
  }
  return this.like;
};
