const fs = require("fs");
const path = require("path");

const readDir = (dirPath, cb) => {
  const elements = fs.readdirSync(dirPath, { withFileTypes: true });
  const dirsList = elements.filter((item) => item.isDirectory());
  const filesList = elements.filter((item) => !item.isDirectory());

  if (filesList?.length > 0) {
    cb(
      dirPath,
      filesList.map((item) => item.name)
    );
  }

  dirsList.forEach((dir) => {
    readDir(dirPath + path.sep + dir.name, cb);
  });
};

const walkDir = (dirPath, cb) => {
  if(!dirPath || !(typeof cb === 'function')) {
    return
  }
  readDir(dirPath, cb);
};

module.exports = { walkDir };
