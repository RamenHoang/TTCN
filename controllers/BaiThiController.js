const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const stringUtil = require('../utils/stringUtil');
const requestHandler = new RequestHandler(new Logger());

class BaiThiController extends BaseController {
  static async addBaiThi(req, res) {
    try {
      const schema = Joi.object({
        TenBaiThi: Joi.string().max(100).required(),
        CheDo: Joi.number().integer(),
        NgayTao: Joi.date(),
        BaiThiYeuThich: Joi.number().integer(),
        ChuDe: Joi.string().max(50),
        ThoiGianBatDau: Joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/),
        ThoiGianThi: Joi.number().integer(),
        AnhBia: Joi.string().max(100),
        MatKhauBaiThi: Joi.string().max(20)
      });

      const {error} = schema.validate(req.body);
      requestHandler.validateJoi(error, 400, 'bad Request', 'invalid BaiThi data');

      req.body.MaUserTao = req.decoded.Id;
      req.body.Id = `baithi_${stringUtil.generateString()}`;

      const baithiAdded = await super.create(req, 'TaBaiThi');
      requestHandler.sendSuccess(res, 'Create new BaiThi successfully', 201)(baithiAdded.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }
}

module.exports = BaiThiController;
