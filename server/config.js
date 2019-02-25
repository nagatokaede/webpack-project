'use static';

const env = process.env;

const config = {
  port: env.PORT || '8888',
  mode: env.MODE || 'development'
};

module.exports = config;
