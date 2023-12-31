const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(count) => "stores"
 * removeColumn(price) => "stores"
 * addColumn(count) => "goods"
 * addColumn(price) => "goods"
 *
 */

const info = {
  revision: 14,
  name: "noname",
  created: "2023-10-20T11:42:58.784Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["stores", "count", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["stores", "price", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "count",
      { type: Sequelize.TEXT, field: "count" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "price",
      { type: Sequelize.TEXT, field: "price" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["goods", "count", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["goods", "price", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "stores",
      "count",
      { type: Sequelize.TEXT, field: "count" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "stores",
      "price",
      { type: Sequelize.TEXT, field: "price" },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
