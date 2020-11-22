const router = require('express').Router();
const auth = require('../../utils/auth');
const HsTraLoiController = require('../../controllers/HsTraLoiController');

/**
 * @swagger
 * definitions:
 *  TaHsTraLoi:
 *    required:   
 *      - MaBaiThi
 *      - MaUserThi
 *      - DiemThi
 *      - MaCauHoi
 *      - TraLoi
 *      
 *    properties:
 *      MaBaiThi:
 *        type: string
 *        description: baithi_`random string length 10`
 *      MaUserThi:
 *        type: string
 *        description: user_`random string length 10`
 *      DiemThi:
 *        type: float
 *        description: diemthi_`number in 0-10`
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
 *        description: data of HsTraLoi  
 *        required: true
 *        schema:
 *          type: object
 *          required: 
 *              - MaCauTraLoi
 *          properties:
 *            MaBaiThi:
 *              type: string
 *            MaUserThi:
 *              type: string
 *            DiemThi:
 *              type: float
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
 * /hstraloi/mod/{MaCauTraLoi}:
 *  put:
 *    tags:
 *      - HsTraLoi
 *    produces:
 *      - application/json
 *    security:
 *      - Bearer: []
 *    parameters:
 *      - name: MaCauTraLoi
 *        in: path
 *        required: true
 *        type: string  
 *      - name: body
 *        in: body
 *        description: modify your cau tra loi cua hoc sinh
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            DiemThi:
 *              type: int
 *              description: kieu nguyen
 *            TraLoi:
 *              type: int
 *    responses:
 *      200:
 *        description: HsTraLoi has been modified successfully
 */

router.put('/mod', auth.isAuthunticated, HsTraLoiController.modifyHsTraLoi);

/**
 * @swagger
 * /hstraloi/list:
 *  get:
 *    tags: 
 *      - HsTraLoi
 *    description: Hien hi diem thi, cau tra loi cua cau hoi do
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
 *        type: int
 *    responses:
 *      200: 
 *        description: List HSTraLoi OK
 */

router.get('/list', auth.isAuthunticated, HsTraLoiController.listCauTraLoi);

/**
 * @swagger
 * /hstraloi/{MaCauTraLoi}:
 *   delete:
 *     tags:
 *       - HsTraLoi
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: MaCauTraLoi
 *        description: MaCauTraLoi muon xoa
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: delete HsTraLoi by MaCauTraLoi
 */
router.delete('/:Id(user_[a-zA-Z0-9]{10})', auth.isAuthunticated, HsTraLoiController.deleteByMaCauTraLoi);


/**
 * @swagger
 * /hstraloi/getDapAnHsTraLoi/{MaCauTraLoi}:
 *  get:
 *    tags: 
 *      - HsTraLoi
 *    description: DapAn APIs
 *    security: 
 *      - Bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: MaCauTraLoi
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200: 
 *        description: Dap an ok
 */

router.get('/getDapAnHsTraLoi/:MaCauTraLoi', auth.isAuthunticated, HsTraLoiController.getDapAnHsTraLoi);

module.exports = router;
