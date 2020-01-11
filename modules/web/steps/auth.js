const { login, password } = require("../../../config/app");
const paths = require("../paths");
const { sleep } = require("../sleep");

module.exports = {
  async auth(page) {
    console.time("proceed auth");
    await page.goto(paths.login);
    await sleep(200).then(() => page.type('[name="UserName"]', login));
    await sleep(200).then(() => page.type('[name="Password"]', password));
    await sleep(200).then(() => page.click('[name=":submit"]'));
    console.timeEnd("proceed auth");
  },
};
