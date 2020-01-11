const { saveParsedProfiles } = require("../../../file");
const { parseProfile } = require("./parseProfile");

module.exports = {
  async parseProfiles(page, profiles) {
    console.time("profiles parsing");
    const parsedProfiles = [];
    for (const profile of profiles) {
      parseProfile(page, profile);
    }
    console.timeEnd("profiles parsing");
    console.log(`Succesfully parsed ${parsedProfiles.length} of ${profiles.length}`);
    await saveParsedProfiles(parsedProfiles);
    return parsedProfiles;
  },
};
