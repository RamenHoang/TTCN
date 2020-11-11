const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const { BadRequest, Created } = require('../utils/httpResponse');
const stringUtil = require('../utils/stringUtil');

const requestHandler = new RequestHandler(new Logger());

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
}

module.exports = NganHangController;
