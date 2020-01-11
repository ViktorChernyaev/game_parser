const puppeteer = require("puppeteer");
const { auth } = require("./steps/auth");
const { parsePagination } = require("./steps/parsePagination");
const { parseProfiles } = require("./steps/parseProfiles");
const { sleep } = require("./sleep");
const { notify } = require("../notify");
const { saveProfilesList, saveParsedProfiles } = require("../file");

const someUserMock = [{ link:"/profile/1068933", lvl:34 }];

module.exports = {
  async parse() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    try {
      await auth(page);
      const profilesList = await parsePagination(page);
      const profiles = await parseProfiles(browser, profilesList);
    } catch(error) {
      await notify(error);
      console.error(error);
    }

    await browser.close();
  },
};
