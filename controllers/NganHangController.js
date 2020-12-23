const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const { BadRequest, Created } = require('../utils/httpResponse');
const stringUtil = require('../utils/stringUtil');
const { Op } = require('sequelize');

const requestHandler = new RequestHandler(new Logger());

const { maxLimit, minOffset } = require('../config/appconfig').paginate;
class NganHangController extends BaseController {
  static async addNganHang(req, res) {
    try {
      const schema = Joi.object({
        TenNganHang: Joi.string().max(100).required(),
        LinhVuc: Joi.string().required(),
        MoTa: Joi.string(),
        ThuocTinh: Joi.number().integer()
      });

      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'Data is invalid');

      req.body.Id = `nganhang_${stringUtil.generateString()}`;
      const result = await super.create(req, 'TaNganHang');

      requestHandler.sendSuccess(res, 'NganHang is created successfully', Created.status)(result);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async listNganHang(req, res) {
    try {
      const schema = Joi.object({
        offset: Joi.number().integer().min(minOffset).required(),
        limit: Joi.number().integer().max(maxLimit).required(),
        TenNganHang: Joi.string(),
        LinhVuc: Joi.string()
      });
      const { error } = schema.validate(req.query);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'offset and limit is invalid');

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
      requestHandler.sendError(req, res, error);
    }
  }
}

module.exports = NganHangController;
