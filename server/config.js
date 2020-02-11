'use static';

const env = process.env;

const config = {
  port: env.PORT || '8080',
  mode: env.NODE_ENV || 'development',
  proxy: [
    {
      target: `http://${env.NODE_PROJECT || 'nagato.top:3000'}/`,
      context: 'api-getaway'
    },
  ]
};

module.exports = config;
