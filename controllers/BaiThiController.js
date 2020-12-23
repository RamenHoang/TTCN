const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const stringUtil = require('../utils/stringUtil');
const { OK, BadRequest } = require('../utils/httpResponse');

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
      
      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid BaiThi data');

      req.body.MaUserTao = req.decoded.Id;
      req.body.Id = `baithi_${stringUtil.generateString()}`;

      const baithiAdded = await super.create(req, 'TaBaiThi');
      requestHandler.sendSuccess(res, 'Create new BaiThi successfully', OK.status)(baithiAdded.dataValues);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async modBaiThi(req, res) {
    try {
      const schema = Joi.object({
        TenBaiThi: Joi.string().max(100),
        CheDo: Joi.number().integer(),
        NgayTao: Joi.date(),
        BaiThiYeuThich: Joi.number().integer(),
        ChuDe: Joi.string().max(50),
        ThoiGianBatDau: Joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/),
        ThoiGianThi: Joi.number().integer(),
        AnhBia: Joi.string().max(100),
        MatKhauBaiThi: Joi.string().max(20)
      });

      const { error } = schema.validate(req.body);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'Data is invalid');

      const result = await super.updateById(req, 'TaBaiThi', req.body);
      requestHandler.sendSuccess(res, 'BaiThi is modified successfully', OK.status)(result);
    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

  static async listBaiThi(req, res) {
    try {
      const schema = Joi.object({
        page: Joi.number().integer().required(),
        TenBaiThi: Joi.string(),
        ChuDe: Joi.string()
      });
      const { error } = schema.validate(req.query);
      requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'page is invalid');

      const options = {}
      if (req.query.TenBaiThi) {
        options.where = {
          TenBaiThi: {
            [Op.like]: `%${req.query.TenBaiThi}%`
          }
        }
      }
      if (req.query.ChuDe) {
        if (options.where) {
          options.where = {
            ...options.where,
            ChuDe: {
              [Op.like]: `%${req.query.ChuDe}%`
            }
          }
        } else {
          options.where = {
            ChuDe: {
              [Op.like]: `%${req.query.ChuDe}%`
            }
          }
        }
      }

      const list = await super.getList(req, 'TaBaiThi', options);

      requestHandler.sendSuccess(res, 'List NganHang: OK')(list);
    } catch (error) {
      requestHandler.sendError(error, res, error);
    }
  }
}

module.exports = BaiThiController;
