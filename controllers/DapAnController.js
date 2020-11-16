const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const Joi = require('joi');
const stringUtil = require('../utils/stringUtil');
const { OK, BadRequest } = require('../utils/httpResponse');
const { Op } = require('sequelize');

const requestHandler = new RequestHandler(new Logger());

class DapAnController extends BaseController {
    static async addDapAn(req, res) {
        try {
            const schema = Joi.object({
                MaCauHoi: Joi.string().max(50).required(),
                NoiDungDapAn: Joi.string().max(100).required(),
                CauTraLoiDung: Joi.number().integer().required(),
                AnhDinhKem: Joi.string().max(50),
            });

            const { error } = schema.validate(req.body);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid DapAn data');

            req.body.Id = `dapan_${stringUtil.generateString()}`;

            const dapanAdded = await super.create(req, 'TaDapAn');
            requestHandler.sendSuccess(res, 'Create new DapAn successfully', OK.status)(dapanAdded.dataValues);
        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }

    static async modDapAn(req, res) {
        try {
            const schema = Joi.object({
                NoiDungDapAn: Joi.string().max(100).required(),
                CauTraLoiDung: Joi.number().integer().required(),
                AnhDinhKem: Joi.string().max(50),
            });

            const { error } = schema.validate(req.body);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'Data is invalid');

            const result = await super.updateById(req, 'TaDapAn', req.body);
            requestHandler.sendSuccess(res, 'DapAn is modified successfully', OK.status)(result);
        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }
    static async getDapAn(req, res) {
        try {
            const schema = Joi.object({
                MaCauHoi: Joi.string().max(50),
            });

            const { error } = schema.validate(req.params);
            requestHandler.validateJoi(error, BadRequest.status, BadRequest.error, 'invalid');

            const options = {}
            options.where = {
                MaCauHoi: req.params.MaCauHoi
            }

            const rep = await super.getByCustomOptions(req, 'TaDapAn', options);
            requestHandler.sendSuccess(res, 'Dap an: ')(rep);

        } catch (error) {
            requestHandler.sendError(req, res, error);
        }
    }
}

module.exports = DapAnController;
