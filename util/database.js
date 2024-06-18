const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root','qhfltn3784',
    {dialect: 'mysql', host: 'localhost',timezone: "Asia/Seoul",});

module.exports = sequelize;