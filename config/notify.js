const {
  NOTIFICATIONS_TOKEN,
  NOTIFICATIONS_ID
} = process.env;

if (!NOTIFICATIONS_TOKEN) throw new Error ("please provide NOTIFICATIONS_TOKEN");
if (!NOTIFICATIONS_ID) throw new Error ("please provide NOTIFICATIONS_ID");

module.exports = {
  token: NOTIFICATIONS_TOKEN,
  chat_id: NOTIFICATIONS_ID,
};
