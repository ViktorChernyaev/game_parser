const paths = require("../paths");
const { sleep } = require("../sleep");
const { saveProfilesList } = require("../../file");

const START_FROM = 85;
const TOTAL_PAGES = Array.from(Array(2));

module.exports = {
  async parsePagination(page) {
    console.time("pagination parsing");
    await page.goto(paths.pagination(START_FROM));
    const players = [];
    for (const pageNumber of TOTAL_PAGES) {
      await sleep(200);
      const playersPerPage = await page.evaluate(() => {
        const nodes = document.querySelectorAll("td a");
        return Array.from(nodes, item => {
          const link = item.getAttribute("href");
          const [lvlString] = item.querySelector(".nwr").textContent.split(" ");
          return { link, lvl: parseInt(lvlString, 10) };
        });
      });
      const validPalyers = playersPerPage.filter(item => item.lvl > 10);
      if (validPalyers.length === 0) break;
      players.push(...playersPerPage);
    }
    console.timeEnd("pagination parsing");
    console.log(`Total players count: ${players.length}`);
    await saveProfilesList(players);
    return players;
  },
};
