const DapAnController = require('../../controllers/DapAnController');
const router = require('express').Router();
const {isAuthunticated} = require('../../utils/auth');

/**
 * @swagger
 * definitions:
 *  TaDapAn:
 *    required:
 *      - MaCauHoi
 *      - NoiDungDapAn
 *      - CauTraLoiDung
 *      - AnhDinhKem
 *    properties:
 *      MaCauHoi:
 *        type: string
 *        description: cauhoi_`random string length 10`
 *      NoiDungDapAn:
 *        type: string
 *      CauTraLoiDung:
 *        type: string
 *      AnhDinhKem:
 *        type: string
 *        description: path to image
 */

/**
 * @swagger
 * /dapan/add:
 *  post:
 *    tags: 
 *      - DapAn
 *    description: DapAn APIs
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
 *            - MaCauHoi
 *          properties:
 *            MaCauHoi:
 *              type: string
 *            NoiDungDapAn:
 *              type: string
 *              description: {1:'r1', 2:'r2', 3: 'r3', 4: 'r4'}
 *            CauTraLoiDung:
 *              type: string
 *            AnhDinhKem:
 *              type: string
 *    responses:
 *      201: 
 *        description: Dap an is created successfully
 */

router.post('/add', isAuthunticated, DapAnController.addDapAn);

/**
  * @swagger
  * /dapan/mod/{MaDapAn}:
  *   put:
  *     tags: 
  *       - DapAn
  *     description: modify DapAn
  *     security: 
  *       - Bearer: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: MaDapAn
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

 router.put('/mod/:Id(dapan_[a-zA-Z0-9]{10})', isAuthunticated, DapAnController.modDapAn);

 /**
 * @swagger
 * /dapan/getDapAn/{MaCauHoi}:
 *  get:
 *    tags: 
 *      - DapAn
 *    description: DapAn APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: MaCauHoi
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200: 
 *        description: Dap an ok
 */

router.get('/getDapAn/:MaCauHoi', isAuthunticated, DapAnController.getDapAn);

module.exports = router;
