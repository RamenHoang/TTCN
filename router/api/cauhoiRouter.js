const CauhoiController = require('../../controllers/CauhoiController');
const router = require('express').Router();
const {isAuthunticated} = require('../../utils/auth');

/**
 * @swagger
 * definitions:
 *  TaCauHoi:
 *    required:
 *      - MaCauHoi
 *      - MaNganHang
 *      - NoiDungCauHoi
 *      - AnhDinhKem
 *    properties:
 *      MaCauHoi:
 *        type: string
 *        description: cauhoi_`random string length 10`
 *      MaNganHang:
 *        type: string
 *        description: nganhang_`random string length 10`
 *      NoiDungCauHoi:
 *        type: string
 *      AnhDinhKem:
 *        type: string
 *        description: path to image
 */

/**
 * @swagger
 * /cauhoi/add:
 *  post:
 *    tags: 
 *      - CauHoi
 *    description: CauHoi APIs
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
 *            - MaNganHang
 *            - NoiDungCauHoi
 *          properties:
 *            MaNganHang:
 *              type: string
 *            NoiDungCauHoi:
 *              type: string
 *    responses:
 *      201: 
 *        description: CauHoi is created successfully
 */

router.post('/add', isAuthunticated, CauhoiController.addCauHoi);

/**
  * @swagger
  * /cauhoi/mod/{MaCauHoi}:
  *   put:
  *     tags: 
  *       - CauHoi
  *     description: modify CauHoi
  *     security: 
  *       - Bearer: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: MaCauHoi
  *         in: path
  *         required: true
  *         type: string
  *       - name: body
  *         in: body
  *         description: data of BaiThi
  *         required: true
  *         schema:
  *           type: object
  *           properties:
  *             MaNganHang:
  *               type: string
  *             NoiDungCauHoi:
  *               type: string
  *             AnhDinhKem:
  *               type: string
  *     responses:
  *       200:
  *         description: Cauhoi is modified successfully
  */ 

 router.put('/mod/:Id(cauhoi_[a-zA-Z0-9]{10})', isAuthunticated, CauhoiController.modCauHoi);

 /**
 * @swagger
 * /cauhoi/list:
 *  get:
 *    tags: 
 *      - CauHoi
 *    description: CauHoi APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: offset
 *        in: query
 *        required: true
 *        type: integer
 *      - name: limit
 *        in: query
 *        required: true
 *        type: integer
 *      - name: MaNganHang
 *        in: query
 *        type: string
 *    responses:
 *      200: 
 *        description: List CauHoi OK
 */

router.get('/list', isAuthunticated, CauhoiController.listCauHoi);

module.exports = router;
