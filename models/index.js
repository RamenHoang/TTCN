const Sequelize = require('sequelize');
// Import models here
const TaUser = require('./TaUser');
const TaBaiThi = require('./TaBaiThi');
const TaCauHoi = require('./TaCauHoi');
const TaDapAn = require('./TaDapAn');
const TaGoiCauHoi = require('./TaGoiCauHoi');
const TaNganHang = require('./TaNganHang');
const TaHsTraLoi = require('./TaHsTraLoi');
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
db.TaUser = TaUser(sequelize, Sequelize);
db.TaBaiThi = TaBaiThi(sequelize, Sequelize);
db.TaCauHoi = TaCauHoi(sequelize, Sequelize);
db.TaDapAn = TaDapAn(sequelize, Sequelize);
db.TaGoiCauHoi = TaGoiCauHoi(sequelize, Sequelize);
db.TaNganHang = TaNganHang(sequelize, Sequelize);
db.TaHsTraLoi = TaHsTraLoi(sequelize, Sequelize);

// Init table relationship
// User - BaiThi
db.TaUser.hasMany(db.TaBaiThi, {
	foreignKey: "MaUser",
	as: "BaiThi"
});
db.TaBaiThi.belongsTo(db.TaUser, {
	foreignKey: "MaUser"
});
// User - HsTraLoi
db.TaUser.hasMany(db.TaHsTraLoi, {
	foreignKey: 'MaUserThi',
	as: 'HsTraLoi'
});
db.TaHsTraLoi.belongsTo(db.TaUser, {
	foreignKey: 'MaUserThi'
});
// BaiThi - HsTraLoi
db.TaBaiThi.hasMany(db.TaPhongThi, {
	foreignKey: 'MaBaiThi',
	as: 'HsTraLoi'
});
db.TaHsTraLoi.belongsTo(db.TaBaiThi, {
	foreignKey: 'MaBaiThi'
});
// BaiThi - GoiCauHoi
db.TaBaiThi.hasMany(db.TaGoiCauHoi, {
	foreignKey: 'MaBaiThi',
	as: 'GoiCauHoi'
});
db.TaGoiCauHoi.belongsTo(db.TaBaiThi, {
	foreignKey: 'MaBaiThi'
});
// GoiCauHoi - CauHoi
db.TaGoiCauHoi.hasMany(db.TaCauHoi, {
	foreignKey: 'MaCauHoi',
	as: 'CauHoi'
});
// CauHoi - NganHang
db.TaNganHang.hasMany(db.TaCauHoi, {
	foreignKey: 'MaNganHang',
	as: 'CauHoi'
});
db.TaCauHoi.belongsTo(db.TaNganHang, {
	foreignKey: 'MaNganHang'
});
// CauHoi - DapAn
db.TaCauHoi.hasOne(db.TaDapAn, {
	foreignKey: 'MaCauHoi',
	as: 'DapAn'
});
db.TaDapAn.belongsTo(db.TaCauHoi, {
	foreignKey: 'MaCauHoi'
});
// GoiCauHoi - HsTraLoi
db.TaGoiCauHoi.hasMany(db.TaHsTraLoi, {
	foreignKey: 'MaCauHoi',
	as: 'HsTraLoi'
});
db.TaHsTraLoi.belongsTo(db.TaGoiCauHoi, {
	foreignKey: 'MaCauHoi'
});

module.exports = db;
