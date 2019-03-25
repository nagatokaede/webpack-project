'use static';
const request = require('request');

const getHtml = url => {
  request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const reg = /(display_url":")[a-zA-z]+:\/\/[^"]*/ig;
      const content = body.match(reg);
      const urlList = [];
      for (const i in content) {
        urlList.push(content[i].split('display_url":"')[1]);
      }
      console.log(urlList);
    }
  });
};

module.exports = getHtml;
