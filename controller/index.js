const private = require("./private");
const public = require("./public");
const { Router } = require("express");

const initRouters = (webServer, routers) => {
  if (!webServer || !Array.isArray(routers?.controllers || !routers?.path)) {
    if (!Array.isArray(routers?.controllers || !routers?.path)) {
      console.log(`controllers ${routers?.path} not correct`);
      return;
    }
    console.log("web server is not defined");
    return;
  }

  const router = Router();
  routers?.controllers.forEach((item) => {
    if (item.name && item.router) {
      router.use(item.name, item.router);
    }
  });
  webServer.use(routers.path, router);
};

const initLoad = (webServer) => {
  initRouters(webServer, private);
  initRouters(webServer, public);
};

module.exports = initLoad;
