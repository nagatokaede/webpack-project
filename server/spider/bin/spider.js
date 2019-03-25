'use static';
const request = require('request');

const getHtml = url => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const reg = /(display_url":")[a-zA-z]+:\/\/[^"]*/ig;
        const content = body.match(reg);
        const urlList = [];
        if (content[0] !== content[1]) {
          urlList.push(content[0].split('display_url":"')[1]);
        }
        for (let i = 1; i < content.length; i++) {
          urlList.push(content[i].split('display_url":"')[1]);
        }
        resolve(urlList);
      }
      if (err) reject(err);
    });
  });
};

module.exports = getHtml;
