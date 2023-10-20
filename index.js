require("module-alias/register");
require("./config");
require("./events");
const { app } = require("./config");
const wsServer = require("./wsServer");
const { userRole, media, good, queryBuilder } = require("@models");
const initLoad = require("./controller");
const { Op, fn, literal } = require("sequelize");

if (typeof wsServer === "function") {
  wsServer(app);
}
if (typeof initLoad === "function") {
  initLoad(app);
}

// initRouters(app, routers.private);
// initRouters(app, routers.public);

// if (Array.isArray(routers.private?.controllers) && routers.private?.path) {
//   const router = express.Router();
//   routers.private?.controllers.forEach((item) => {
//     if (item.name && item.router) {
//       router.use(item.name, item.router);
//       // app.use(item.name, item.router);
//     }
//   });
//   app.use(routers.private?.path, router);
// } else {
//   console.log("controllers private not correct");
// }

// if (Array.isArray(routers.public?.controllers) && routers.public?.path) {
//   const router = express.Router();
//   routers.public?.controllers.forEach((item) => {
//     if (item.name && item.router) {
//       router.use(item.name, item.router);
//       // app.use(item.name, item.router);
//     }
//   });
//   app.use(routers.public?.path, router);
// }

app.listen(8787, () => {
  console.log("server listen on port: 8787");
});

// good.create({caption: 'test6', count: 22, price: 51})

good.findAll().then((data) => {
  console.log(data.reduce((acc, req) => acc + req.full, 0));
});

console.log(
  queryBuilder(good, {
    attributes: [fn("count", "id")],
    where: { caption: { [Op.getLike()]: "%234%" } },
  })
);

const tempSQL =  queryBuilder(good, {
  attributes: [fn("count", "id")],
  where: { caption: { [Op.getLike()]: "%234%" } },
})

good.findAll({logging: console.log, attributes: [literal(`(${tempSQL})`)]})

// media.findAll().then((data) => {
//   console.log(data.map((item) => item.toJSON()));
// });

// userRole.create({ caption: "auto create", controller: "document", userId: 1 });
// user.create({
//   caption: "user1",
//   description: "user1",
//   login: "user1",
//    password: "123",
// });

// caption: DataTypes.TEXT,

//       login: DataTypes.TEXT,
//       password: DataTypes.TEXT,

//       description: DataTypes.TEXT,

////////////////////////////////////////////////////////
///
///

// const timer = () => {
//   return new Promise((res) => {
//     setTimeout(() => {
//       res();
//     }, 5000);
//   });
// };

// process.myEvents?.on("new order", async (_, getHeaders, answer) => {
//   await timer();
//   if (typeof getHeaders === "function") {
//     const headers = getHeaders();
//     console.log(headers);
//     answer({ user: headers.authorization });
//   }
//   console.log("OK new order");
// });

// process.myEvents?.on("webSocketData", (props) => {
//   const { data, send } = props;
//   send("pong : " + data);
// });

// process.myEvents?.on("webSocketData", (props) => {
//   const { data, send } = props;
//   send("new listener pong : " + data);
// });

// ////////////////////////////////////////////////////

// class Test {
//   prop1 = 1
//   func1 (){}

//   get prop2() {
//     return '1'
//   }
//   set prop2(value) {

//   }

//   get transactionId() {
//     return ''
//   }

//   set transactionId(value) {

//   }
// }

// class Test2 extends Test {

// }

// const test = new Test()
// const test2 = new Test2()
//  console.log(test.prop2) // используется get
// test.prop2 = 10  // используется set

// test.transactionId = '100'
// console.log('tr id',test.transactionId)
