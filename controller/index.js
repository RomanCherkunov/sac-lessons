const private = require("./private");
const public = require("./public");
const {Router} = require('express')

const initRouters = (webServer, routers) => {
  if (!webServer) {
    console.log("web server is not defined");
    return;
  }

  if (Array.isArray(routers?.controllers) && routers?.path) {
    const router = Router();
    routers?.controllers.forEach((item) => {
      if (item.name && item.router) {
        router.use(item.name, item.router);
      }
    });
    webServer.use(routers.path, router);
  } else {
    console.log(`controllers ${routers?.path} not correct`);
  }
};

const initLoad = (webServer) => {
  initRouters(webServer, private);
  initRouters(webServer, public);
};

module.exports = initLoad;
