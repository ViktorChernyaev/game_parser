module.exports = {
  sleep(timeout) {
    return new Promise((res, rej) => {
      const timeoutId = setTimeout(() => {
        res();
        clearTimeout(timeoutId);
      }, timeout);
    });
  },
};
