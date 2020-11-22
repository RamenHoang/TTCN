const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const { BadRequest, Created } = require('../utils/httpResponse');
const stringUtil = require('../utils/stringUtil');
const { Op } = require('sequelize');
const modelName = 'TaHsTraLoi'

const requestHandler = new RequestHandler(new Logger());

class HsTraLoiController extends BaseController {
  static async addCauTraLoi(req, res) {
    try {
      const schema = Joi.object({
        MaBaiThi: Joi.string().max(100).required(),
        MaUserThi: Joi.string().required(),
        DiemThi: Joi.number().integer(),
        MaCauHoi: Joi.number().integer(),
        TraLoi: Joi.number().integer()
      });

      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'Invalid HsTraLoi addCauTraLoi data');

      req.body.Id = `hstraloi_${stringUtil.generateString()}`;
      const result = await super.create(req, 'TaHsTraLoi');

      requestHandler.sendSuccess(res, 'HsTraLoi is created successfully', Created.status)(result.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async modifyHsTraLoi(req, res) {
    try {
      const schema = Joi.object({
        DiemThi: Joi.number().integer.required(),
        TraLoi: Joi.number().integer().required(),
      });
      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid HsTraLoi');

      const result = await super.updateById(req, modelName, req.body);
      return requestHandler.sendSuccess(res, 'HsTraLoi is modified successfully', OK.status)(result);
    } catch (error) {
      return requestHandler.sendError(req, res, error);
    }
  }

  static async deleteByMaCauTraLoi(req, res) {
    try {
      const result = await super.deleteById(req, modelName);
      return requestHandler.sendSuccess(res, 'HsTraLoi Deleted Successfully')(result);
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }

  static async getDapAnHsTraLoi(req, res) {
    try {
      const schema = Joi.object({
          MaCauTraLoi: Joi.string().max(50) ,
      });

      const { error } = schema.validate(req.params);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid');

      const options = {}
      options.where = {
          MaCauTraLoi: req.params.MaCauTraLoi
      }

      const rep = await super.getByCustomOptions(req, modelName, options);
      requestHandler.sendSuccess(res, 'Dap an: ')(rep);

  } catch (error) {
      requestHandler.sendError(req, res, error);
  }
  }

  static async listCauTraLoi(req, res) {
    try {
      const schema = Joi.object({
        page: Joi.number().integer().required(),
        TenNganHang: Joi.string(),
        LinhVuc: Joi.string()
      });
      const { error } = schema.validate(req.query);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'page is invalid');

      const options = {}
      if (req.query.TenNganHang) {
        options.where = {
          TenNganHang: {
            [Op.like]: `%${req.query.TenNganHang}%`
          }
        }
      }
      if (req.query.LinhVuc) {
        if (options.where) {
          options.where = {
            ...options.where,
            LinhVuc: {
              [Op.like]: `%${req.query.LinhVuc}%`
            }
          }
        } else {
          options.where = {
            LinhVuc: {
              [Op.like]: `%${req.query.LinhVuc}%`
            }
          }
        }
      }

      const list = await super.getList(req, 'TaNganHang', options);

      requestHandler.sendSuccess(res, 'List NganHang: OK')(list);
    } catch (error) {
      requestHandler.sendError(error, res, error);
    }
  }
}

module.exports = HsTraLoiController;
