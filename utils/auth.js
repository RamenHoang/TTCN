const { verify } = require('jsonwebtoken');
const config = require('../config/appconfig');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const { Unauthorized } = require('../utils/httpResponse');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

function getTokenFromHeader(req) {
	if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
		|| (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
}

function verifyToken(req, res, next) {
	try {
		if (req.headers.authorization === undefined || req.headers.authorization === null) {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}
		const Bearer = req.headers.authorization.split(' ')[0];

		if (!Bearer || Bearer !== 'Bearer') {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			requestHandler.throwError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
		}

		// verifies secret and checks exp
		verify(token, config.auth.jwt_secret, (err, decoded) => {
			if (err) {
				requestHandler.throwError(401, 'Unauthorized', 'please provide a valid token ,your token might be expired')();
			}

			function passed() {
				req.decoded = decoded;
				next();
			}

			const originalUrl = req.originalUrl.slice(8).split('/');

			if (decoded.NgheNghiep === 'hs') {
				/**
				 * Can:
				 * 	- get, list user
				 * 	- get and modify own profile
				 * 	- get, list hstraloi
				 * 	- add new hstraloi
				 */
				if (
					originalUrl[0] === 'hstraloi' ||
					(
						originalUrl[0] === 'users' &&
						(originalUrl[1] === 'get' || originalUrl[1].indexOf('list') !== -1 || originalUrl[1] === 'profile')
					)
				) return passed();

				requestHandler.throwError(Unauthorized.status, Unauthorized.error, 'You are not allowed to do this action')();
			}

			if (decoded.NgheNghiep === 'gv') {
				/**
				 * Can't do:
				 * 	- add, modify and delete user(other gv or hs or adm)
				 * 	- add new hstraloi
				 */
				if (
					(originalUrl[0] === 'hstraloi' && originalUrl[1] === 'add') ||
					(
						originalUrl[0] === 'users' &&
						(originalUrl[1] === 'add' || originalUrl[1] === 'mod' || req.method === 'DELETE')
					)
				) requestHandler.throwError(Unauthorized.status, Unauthorized.error, 'You are not allowed to do this action')();

				// Can do
				return passed();
			}

			if (decoded.NgheNghiep === 'adm') return passed();

			requestHandler.throwError(Unauthorized.status, Unauthorized.error, 'You are not allowed to do this action')();
		});
	} catch (err) {
		requestHandler.sendError(req, res, err);
	}
}


module.exports = { getJwtToken: getTokenFromHeader, isAuthunticated: verifyToken };
