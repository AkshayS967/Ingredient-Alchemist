module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key: 'FinalProjectServerKey.pem',
      user : 'ubuntu',
      host : '13.126.109.92',
      ref  : 'origin/main',
      repo : 'git@github.com:AkshayS967/Ingredient-Alchemist.git',
      path : '/home/ubuntu/',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    }
  }
};
