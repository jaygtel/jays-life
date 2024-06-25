module.exports = {
  apps: [
    {
      name: 'jays-life',
      script: 'app.js',
      instances: 'max', // Or a specific number of instances
      exec_mode: 'cluster', // To enable clustering
      env: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 4080
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 4080
      }
    }
  ]
};
