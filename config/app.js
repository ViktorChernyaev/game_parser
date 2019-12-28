const {
  USER_LOGIN,
  USER_PASSWORD,
  APP_URL,
} = process.env;

if (!USER_LOGIN) throw new Error ("please provide USER_LOGIN");
if (!USER_PASSWORD) throw new Error ("please provide USER_PASSWORD");
if (!APP_URL) throw new Error ("please provide APP_URL");

module.exports = {
  login: USER_LOGIN,
  password: USER_PASSWORD,
  url: APP_URL,
};
