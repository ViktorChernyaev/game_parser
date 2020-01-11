const { url } = require("../../config/app");

module.exports = {
  root: path => `${url}${path}`,
  login: `${url}/login`,
  pagination: num => `${url}/online/all/${num}`,
};
