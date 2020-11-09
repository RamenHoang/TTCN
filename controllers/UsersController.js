const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const auth = require('../utils/auth');
const config = require('../config/appconfig');
const { Op } = require('sequelize');

const stringUtil = require('../utils/stringUtil');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class UsersController extends BaseController {
  static async getUserById(req, res) {
    try {
      const schema = Joi.object({
        Id: Joi.string().regex(/user_[a-zA-Z0-9]{10}/),
      });
      const { error } = schema.validate({ Id: req.params.Id });
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User Id');

      const result = await super.getById(req, 'TaUser');
      return requestHandler.sendSuccess(res, 'User Data Extracted')(_.omit(result.dataValues, ['Password']));
    } catch (error) {
      return requestHandler.sendError(req, res, error);
    }
  }

  static async deleteById(req, res) {
    try {
      const result = await super.deleteById(req, 'TaUser');
      return requestHandler.sendSuccess(res, 'User Deleted Successfully')({ result });
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }

  static async getProfile(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const options = {
        where: { Id: user.Id },
      };
      const userProfile = await super.getByCustomOptions(req, 'TaUser', options);
      return requestHandler.sendSuccess(res, 'User Profile fetched Successfully')(_.omit(userProfile.dataValues, ['Password']));
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }

  static async addUser(req, res) {
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
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User data');

      // Hash password
      const hashedPass = bcrypt.hashSync(req.body.Password, config.auth.saltRounds);
      req.body.Password = hashedPass;
      // Create MaUser
      req.body.Id = `user_${stringUtil.generateString()}`;

      const userAdded = await super.create(req, 'TaUser');

      if (!userAdded) {
        requestHandler.throwError(400, 'bad Request', 'invalid User data');
      }

      requestHandler.sendSuccess(res, 'Create new user success', 201)(userAdded.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async modifyUser(req, res) {
    try {
      const schema = Joi.object({
        HoTen: Joi.string(),
        GioiTinh: Joi.number(),
        NgaySinh: Joi.date(),
        QueQuan: Joi.string(),
        NgheNghiep: Joi.string(),
        Email: Joi.string().email(),
        SoDienThoai: Joi.string().regex(/0[0-9]{9}/),
        NoiLamViec: Joi.string(),
        Username: Joi.string().regex(/^[a-zA-Z0-9_]{6,100}$/),
        Password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/)
      });

      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User data');

      const userAdded = await super.updateById(req, 'TaUser', req.body);

      if (!userAdded) {
        requestHandler.throwError(400, 'bad Request', 'invalid User data');
      }

      requestHandler.sendSuccess(res, 'Create new user success', 201)(userAdded.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async listUser(req, res) {
    try {
      const schema = Joi.object({ page: Joi.number().integer().min(1).required() });
      const { error } = schema.validate({ page: req.query.page });
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid query \'page\'');

      const token = auth.getJwtToken(req);
      const user = jwt.decode(token);

      const options = {
        where: {
          Id: {
            [Op.ne]: user.Id
          }
        },
        attributes: ['HoTen', 'GioiTinh', 'NgaySinh', 'Id', 'Email', 'SoDienThoai', 'QueQuan', 'NoiLamViec', 'Username', 'SoNgayHoatDong', 'TrangThai']
      }
      const users = await super.getList(req, 'TaUser', options)
        .then(
          requestHandler.throwIf(r => r === null || r === undefined || r.length === 0, 404, 'Not found', 'no content is matched'),
          requestHandler.throwError(500, 'bad Request', 'some thing is wrong in server')
        );

      requestHandler.sendSuccess(res, 'list User: OK')(users);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async modifyProfile(req, res) {
    try {
      const schema = Joi.object({
        HoTen: Joi.string(),
        GioiTinh: Joi.number(),
        NgaySinh: Joi.date(),
        QueQuan: Joi.string(),
        NgheNghiep: Joi.string(),
        Email: Joi.string().email(),
        SoDienThoai: Joi.string().regex(/0[0-9]{9}/),
        NoiLamViec: Joi.string(),
        Username: Joi.string().regex(/^[a-zA-Z0-9_]{6,100}$/),
        Password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/)
      });

      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid User data');

      const userAdded = await super.updateById(req, 'TaUser', req.body);

      if (!userAdded) {
        requestHandler.throwError(400, 'bad Request', 'invalid User data');
      }

      requestHandler.sendSuccess(res, 'Your profile is updated', 200)(userAdded.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }
}

module.exports = UsersController;
