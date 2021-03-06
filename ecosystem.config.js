module.exports = {
  apps : [{
    name: 'webpack-project', // 应用程序名称（默认为脚本文件名，不带扩展名）
    script: 'server/server.js', // 相对于pm2开始的脚本路径
    // args: '-a 13 -b 12', // 包含通过CLI传递给脚本的所有参数的字符串
    cwd: './', // 您的应用将从其启动的目录
    instances: 1, // 要启动的应用程序实例数
    autorestart: false, // 默认为true。如果为false，则PM2如果崩溃或和平结束，将不会重新启动您的应用
    watch: false,
    max_memory_restart: '200M', // 如果您的应用超出了指定的内存量，则会重新启动。人性化格式：可以是“ 10M”，“ 100K”，“ 2G”等。
    exec_mode: "fork", // fork 方式启动
    env: {
      NODE_ENV: 'production',
      PORT: '8888',
      NODE_PROJECT: 'localhost:3000',
    }, // pm2 start ecosystem.config.js --env production，将环境切换到NODE_ENV=production
    out_file: './logs/out.log', // 普通日志路径
    error_file: './logs/err.log', // 错误日志路径
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
  }],
};
