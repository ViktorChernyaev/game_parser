const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");

module.exports = {
  async saveParsedProfiles(data) {
    const today = moment().format("YYYY-MM-DD");
    const pathToWrite = path.resolve(__dirname, `../../logs/${today}-profiles.json`);
    return fs.writeFile(pathToWrite, JSON.stringify(data));
  },

  async saveProfilesList(data) {
    const today = moment().format("YYYY-MM-DD");
    const pathToWrite = path.resolve(__dirname, `../../logs/${today}-pagination.json`);
    return fs.writeFile(pathToWrite, JSON.stringify(data));
  },
};
