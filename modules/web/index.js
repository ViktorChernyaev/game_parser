const puppeteer = require("puppeteer");
const { notify } = require("./helpers/notify");
const { sleep } = require("./helpers/sleep");
const { auth } = require("./steps/auth");
const { parsePagination } = require("./steps/parsePagination");
const { parseProfiles } = require("./steps/parseProfiles");
const { saveProfilesList, saveParsedProfiles } = require("../save");

async function parse() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  try {
    await auth(page);
    const profilesList = await parsePagination(page);
    await saveProfilesList(profilesList);
    const profiles = await parseProfiles(page, profilesList);
    // const profiles = await parseProfiles(page, [{ link:"/profile/1068933", lvl:34 }]);
    await saveParsedProfiles(profiles);
    // await sleep(2000).then(() => page.screenshot({path: 'example.png'}));
  } catch(error) {
    await notify(error);
    console.error(error);
  }

  await browser.close();
};

module.exports = { parse };
