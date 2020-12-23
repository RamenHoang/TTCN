const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const stringUtil = require('../utils/stringUtil');
const { OK, BadRequest } = require('../utils/httpResponse');

const requestHandler = new RequestHandler(new Logger());

const { maxLimit, minOffset } = require('../config/appconfig').paginate;
class CauhoiController extends BaseController {
    static async addCauHoi(req, res) {
        try {
            const schema = Joi.object({
                NoiDungCauHoi: Joi.string().max(100).required(),
                MaNganHang: Joi.string().max(50),
                AnhDinhKem: Joi.string().max(50),
            });

            const { error } = schema.validate(req.body);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid Cauhoi data');

            req.body.Id = `cauhoi_${stringUtil.generateString()}`;

            const cauhoiAdded = await super.create(req, 'TaCauHoi');
            requestHandler.sendSuccess(res, 'Create new Cauhoi successfully', OK.status)(cauhoiAdded.dataValues);
        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }
    static async modCauHoi(req, res) {
        try {
            const schema = Joi.object({
                NoiDungCauHoi: Joi.string().max(100).required(),
                MaNganHang: Joi.string().max(50),
                AnhDinhKem: Joi.string().max(50),
            });

            const { error } = schema.validate(req.body);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'Data is invalid');

            const result = await super.updateById(req, 'TaCauHoi', req.body);
            requestHandler.sendSuccess(res, 'CauHoi is modified successfully', OK.status)(result);
        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }
    static async listCauHoi(req, res) {
        try {
            const schema = Joi.object({
                offset: Joi.number().integer().min(minOffset).required(),
                limit: Joi.number().integer().max(maxLimit).required(),
                MaNganHang: Joi.string()
            });
            const { error } = schema.validate(req.query);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'page is invalid');

            const options = {}
            if (req.query.MaNganHang) {
                options.where = {
                    MaNganHang: {
                        [Op.like]: `%${req.query.MaNganHang}%`
                    }
                }
            }
            const list = await super.getList(req, 'TaCauHoi', options);

            requestHandler.sendSuccess(res, 'List Cauhoi: OK')(list);
        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }
}

module.exports = CauhoiController;
