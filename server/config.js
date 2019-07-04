'use static';

const env = process.env;

const config = {
  port: env.PORT || '8080',
  mode: env.MODE || 'development',
  proxy: [
    {
      target: `http://${env.BASEURL || 'kaede.nagato.top:3000'}/`,
      context: 'api-getaway'
    },
  ]
};

module.exports = config;
