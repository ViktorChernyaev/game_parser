const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");

const saveProfilesList = async data => {
  const today = moment().format("YYYY-MM-DD");
  const pathToWrite = path.resolve(__dirname, `../../logs/${today}-pagination.json`);
  return fs.writeFile(pathToWrite, JSON.stringify(data));
};

const saveParsedProfiles = async data => {
  const today = moment().format("YYYY-MM-DD");
  const pathToWrite = path.resolve(__dirname, `../../logs/${today}-profiles.json`);
  return fs.writeFile(pathToWrite, JSON.stringify(data));
};

module.exports = { saveProfilesList, saveParsedProfiles };
