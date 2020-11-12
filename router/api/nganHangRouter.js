const router = require('express').Router();
const auth = require('../../utils/auth');
const NganHangController = require('../../controllers/NganHangController');

/**
 * @swagger
 * definitions:
 *  TaNganHang:
 *    required:
 *      - MaNganHang
 *      - TenNganHang
 *      - LinhVuc
 *    properties:
 *      MaNganHang:
 *        type: string
 *        description: nganhang_`random string length 10`
 *      TenNganHang:
 *        type: string
 *      LinhVuc:
 *        type: string
 *      MoTa:
 *        type: string
 *      ThuocTinh: 
 *        type: string
 */

/**
 * @swagger
 * /nganhang/add:
 *  post:
 *    tags: 
 *      - NganHang
 *    description: NganHang APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - TenNganHang
 *            - LinhVuc
 *          properties:
 *            TenNganHang:
 *              type: string
 *            LinhVuc:
 *              type: string
 *            MoTa:
 *              type: string
 *            ThuocTinh:
 *              type: integer
 *    responses:
 *      201: 
 *        description: NganHang is created successfully
 */

router.post('/add', auth.isAuthunticated, NganHangController.addNganHang);

/**
 * @swagger
 * /nganhang/list:
 *  get:
 *    tags: 
 *      - NganHang
 *    description: NganHang APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: page
 *        in: query
 *        required: true
 *        type: integer
 *      - name: TenNganHang
 *        in: query
 *        type: string
 *      - name: LinhVuc
 *        in: query
 *        type: string
 *    responses:
 *      200: 
 *        description: List NganHang OK
 */

router.get('/list', auth.isAuthunticated, NganHangController.listNganHang);

module.exports = router;
