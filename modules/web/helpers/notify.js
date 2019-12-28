const request = require("request").defaults({ rejectUnauthorized: false });
const { token, chat_id } = require("../../../config/notify");

function notify(text) {
  return new Promise((res, rej) => {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const params = { url, form: { text, chat_id } };
    request.post(params, function (error, response, body) {
      if (error) return rej(error);
      return res(body);
    });
  });
}

module.exports = { notify };
