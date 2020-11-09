require('dotenv').config();

// config.js
module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 12345,
		appName: process.env.APP_NAME || 'ttcn',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		port: process.env.DB_PORT || 3306,
		database: process.env.DB_NAME || 'ttcn',
		password: process.env.DB_PASS || 'ramen1999',
		username: process.env.DB_USER || 'ramen',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'mysql'
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET || 'ddb479c5-481a-4d99-98d0-0d357721dd5e',
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
		saltRounds: process.env.SALT_ROUND || 10,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'c54eff07-68ae-4c5c-9e8f-436ddc308296',
		refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d',
	}
};
