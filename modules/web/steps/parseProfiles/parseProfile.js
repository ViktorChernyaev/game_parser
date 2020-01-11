const paths = require("../../paths");
const { sleep } = require("../../sleep");

module.exports = {
  async parseProfile(page, profile) {
    await sleep(200);
    try {
      await page.goto(paths.root(profile.link));

      //parse head
      const headInfo = await page.evaluate(() => {
        const node = document.querySelector("div.p_end");
        const [nameStr, lvlStr] = node.textContent.split("(");
        return { name: nameStr.trim(), lvl: parseInt(lvlStr, 10) };
      });

      //parse fials
      const fialsInfo = await page.evaluate(() => {
        const [bloodEl, manaEl] = document.querySelectorAll(".brd46.m_5_3_3 a img");
        if (bloodEl && manaEl) {
          return {
            blood: bloodEl.getAttribute("src"),
            bloodClass: bloodEl.getAttribute("class"),
            mana: manaEl.getAttribute("src"),
            manaClass: manaEl.getAttribute("class"),
          };
        }
        return {};
      });

      //parse stats
      const statsInfo = await page.evaluate(() => {
        const [statStrength, statHealth, statArmor] = document.querySelector(".mt10.mb10.pr10").textContent
          .split("\n")
          .map(item => {
            const [prop, value] = item.trim().split(": ");
            if (value) return parseInt(value, 10);
            return null;
          })
          .filter(item => item);
        return { statStrength, statHealth, statArmor };
      });

      //parse old
      const oldInfo = await page.evaluate(() => {
        const info = {};
        const [trash, daysStr] = document.querySelector(".mr5.mt5.mb5").textContent.split(": ");
        if (daysStr) info.days = parseInt(daysStr, 10);

        const [lastWasEl, daysInClanEl] = document.querySelectorAll(".ptb9");
        if (daysInClanEl) {
          const [trash, daysInClanStr] = daysInClanEl.textContent.split(": ");
          info.daysInClan = parseInt(daysInClanStr, 10);
        }
        return info;
      });

      parsedProfiles.push({
        ...headInfo,
        ...fialsInfo,
        ...statsInfo,
        ...oldInfo,
      });
    } catch (error) {
      console.log(`Failed to parse ${profile.link}, ${error}`);
    }
  },
};
