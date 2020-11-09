const Sequelize = require('sequelize');
// Import models here
const TaUser = require('./TaUser');
const TaBaiThi = require('./TaBaiThi');
// Import configure variables here
const dbConfig = require('../config/appconfig').db;

const db = {};

// Init sequalize object
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		pool: {
			max: 5,
			min: 0,
			idle: 15000
		}
	}
);

// Init db instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.TaUser = TaUser(sequelize, Sequelize);
db.TaBaiThi = TaBaiThi(sequelize, Sequelize);

// Init table relationship
// User - BaiThi
db.TaUser.hasMany(db.TaBaiThi, {
	foreignKey: "MaUser",
	as: "BaiThi"
});
db.TaBaiThi.belongsTo(db.TaUser, {
	foreignKey: "MaUser"
});

module.exports = db;
