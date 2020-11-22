const router = require('express').Router();
const auth = require('../../utils/auth');
const HsTraLoiController = require('../../controllers/HsTraLoiController');

/**
 * @swagger
 * definitions:
 *  TaHsTraLoi:
 *    required:
 *      - MaCauTraLoi
 *      - MaBaiThi
 *      - MaUserThi
 *      - MaCauHoi
 *      
 *    properties:
 *      MaCauTraLoi:
 *        type: string
 *        description: macautraloi_`random string length 100`
 *      MaBaiThi:
 *        type: string
 *      MaUserThi:
 *        type: string
 *      DiemThi:
 *        type: float
 *      MaCauHoi: 
 *        type: string
 *      TraLoi:
 *        type: int 
 */

/**
 * @swagger
 * /hstraloi/add:
 *  post:
 *    tags: 
 *      - HsTraLoi
 *    description: HsTraLoi APIS
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
 *            - MaCauTraLoi
 *            - MaBaiThi
 *            - MaUserThi 
 *            
 *          properties:
 *            MaCauTraLoi:
 *              type: string
 *            MaBaiThi:
 *              type: string
 *            MaUserThi:
 *              type: string
 *            DiemThi:
 *              type: integer
 *            MaCauHoi:
 *              type: string
 *            TraLoi:
 *              type: int   
 *    responses:
 *      201: 
 *        description: HsTraLoi is created successfully
 */

router.post('/add', auth.isAuthunticated, HsTraLoiController.addCauTraLoi);

/**
 * @swagger
 * /hstraloi/list:
 *  get:
 *    tags: 
 *      - HsTraLoi
 *    description: HsTraLoi APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: MaCauTraLoi
 *        in: query
 *        required: true
 *        type: integer
 *      - name: MaBaiThi
 *        in: query
 *        type: string
 *      - name: MaUserThi
 *        in: query
 *        type: string
 *      - name: DiemThi
 *        in: query
 *        type: float
 *      - name: MaCauHoi
 *        in: query
 *        type: int
 *      - name: TraLoi
 *        in: query
 *        type: string 
 *    responses:
 *      200: 
 *        description: List HSTraLoi OK
 */

router.get('/list', auth.isAuthunticated, HsTraLoiController.listCauTraLoi);

module.exports = router;
