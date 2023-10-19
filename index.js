require("module-alias/register");
require("./config");
require("./events");
const express = require("express");
const wsServer = require("./wsServer");
const { userRole, media } = require("@models");
const fileUpload = require("express-fileupload");
const initLoad = require("./controller");

const app = express();

if (typeof wsServer === "function") {
  wsServer(app);
}

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    defParamCharset: "utf-8",
    // useTempFiles: true,
    // tempFileDir: "./temp_test",
  })
);
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
