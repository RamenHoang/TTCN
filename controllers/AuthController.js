const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('../controllers/BaseController');
const stringUtil = require('../utils/stringUtil');
const config = require('../config/appconfig');
const auth = require('../utils/auth');
const Joi = require('joi');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};

class AuthController extends BaseController {
	static async login(req, res) {
		try {
			
			const schema = Joi.object({
				Username: Joi.string().regex(/^[a-zA-Z0-9_]{6,100}$/).required(),
				// 7 to 15 characters which contain at least one numeric digit and a special character
				Password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/).required()
			});
			const { error } = schema.validate({
				Username: req.body.Username,
				Password: req.body.Password
			});
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const options = {
				where: {
					Username: req.body.Username
				}
			};
			const user = await super.getByCustomOptions(req, 'TaUser', options);
			if (!user) {
				requestHandler.throwError(400, 'bad request', 'invalid username')();
			}

			await bcrypt
				.compare(req.body.Password, user.dataValues.Password)
				.then(
					requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
					requestHandler.throwError(500, 'bcrypt error'),
				);

			const payload = _.omit(user.dataValues, ['Password', 'HoTen', 'GioiTinh', 'NgaySinh', 'QueQuan', 'SoNgayHoatDong', 'TrangThai', 'Email', 'SoDienThoai', 'NoiLamViec']);
			const token = jwt.sign(
				payload,
				config.auth.jwt_secret,
				{
					expiresIn: config.auth.jwt_expiresin,
					algorithm: 'HS512'
				}
			);
			const refreshToken = jwt.sign(
				payload,
				config.auth.refresh_token_secret,
				{
					expiresIn: config.auth.refresh_token_expiresin,
				}
			);
			const response = {
				status: 'Logged in',
				token,
				refreshToken,
			};
			tokenList[refreshToken] = response;
			requestHandler.sendSuccess(res, 'User logged in Successfully')({ token, refreshToken });
		} catch (error) {
			requestHandler.sendError(req, res, error);
		}
	}

	static async signUp(req, res) {
		try {
			const schema = Joi.object({
				HoTen: Joi.string().required(),
				GioiTinh: Joi.number().integer(),
				NgaySinh: Joi.date(),
				QueQuan: Joi.string(),
				NgheNghiep: Joi.string().required(),
				Email: Joi.string().email(),
				SoDienThoai: Joi.string().regex(/0[0-9]{9}/),
				NoiLamViec: Joi.string(),
				Username: Joi.string().regex(/^[a-zA-Z0-9_]{6,100}$/).required(),
				Password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/).required()
			});

			const { error } = schema.validate(req.body);

			// Validate data from body
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			// Has any user with username?
			const options = {
				where: {
					Username: req.body.Username
				}
			};
			const user = await super.getByCustomOptions(req, 'TaUser', options);

			if (user) {
				// Yes
				requestHandler.throwError(400, 'bad request', 'invalid account, username has already existed')();
			}
			// No
			// Hash password
			const hashedPass = bcrypt.hashSync(req.body.Password, config.auth.saltRounds);
			req.body.Password = hashedPass;
			// Create MaUser
			req.body.Id = `user_${stringUtil.generateString()}`;

			const createdUser = await super.create(req, 'TaUser');
			if (!(_.isNull(createdUser))) {
				requestHandler.sendSuccess(res, 'Account is created successfully', 201)(createdUser.dataValues);
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async refreshToken(req, res) {
		try {
			if (_.isNull(req.body) || _.isUndefined(req.body)) {
				requestHandler.throwError(400, 'bad request', 'please provide the refresh token in request body')();
			}
			const schema = Joi.object({
				refreshToken: Joi.string().required(),
			});
			const { error } = schema.validate({ refreshToken: req.body.refreshToken });
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);

			if ((req.body.refreshToken) && (req.body.refreshToken in tokenList)) {
				const token = jwt.sign({ user }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
				const response = {
					token,
				};
				// update the token in the list
				tokenList[req.body.refreshToken].token = token;
				requestHandler.sendSuccess(res, 'a new token is issued ', 200)(response);
			} else {
				requestHandler.throwError(400, 'bad request', 'no refresh token present in refresh token list')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async logOut(req, res) {
		try {
			const tokenFromHeader = auth.getJwtToken(req);

			for(rf of tokenList) {
				if (tokenList[rf].token === tokenFromHeader) {
					delete tokenList[rf];
					return requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
				}
			}

			requestHandler.throwError(400, 'bad request', 'User has already logged out')();
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}
}
module.exports = AuthController;
