const router = require('express').Router();
const auth = require('../../utils/auth');
const BaiThiController = require('../../controllers/BaiThiController');

/**
  * @swagger
  * definitions:
  *   TaBaiThi:
  *     required:
  *       - MaBaiThi
  *       - TenBaiThi
  *       - MaUserTao
  *     properties:
  *       MaBaiThi:
  *         type: string
  *         description: baithi_`random string length 10`
  *       TenBaiThi:
  *         type: string
  *       CheDo:
  *         type: integer
  *       BaiThiYeuThich:
  *         type: integer
  *       MaUserTao:
  *         type: string
  *         description: user_`random string length 10`
  *       ChuDe:
  *         type: string
  *       ThoiGianBatDau:
  *         type: date
  *       ThoiGianThi:
  *         type: integer
  *         description: unit minutes
  *       AnhBia:
  *         type: string
  *         description: path to AnhBia
  *       MatKhauBaiThi:
  *         type: string
  */

/**
  * @swagger
  * /baithi/add:
  *   post:
  *     tags: 
  *       - BaiThi
  *     description: add new BaiThi
  *     security: 
  *       - Bearer: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         description: data of BaiThi
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - TenBaiThi
  *           properties:
  *             TenBaiThi:
  *               type: string
  *             CheDo:
  *               type: integer
  *             BaiThiYeuThich:
  *               type: integer
  *             ChuDe:
  *               type: string
  *             ThoiGianBatDau:
  *               type: date
  *             ThoiGianThi:
  *               type: integer
  *               description: unit minutes
  *             AnhBia:
  *               type: string
  *               description: path to AnhBia
  *             MatKhauBaiThi:
  *               type: string
  *     responses:
  *       201:
  *         description: Create new BaiThi successfully
  */ 

router.post('/add', auth.isAuthunticated, BaiThiController.addBaiThi);

/**
  * @swagger
  * /baithi/mod/{MaBaiThi}:
  *   put:
  *     tags: 
  *       - BaiThi
  *     description: add new BaiThi
  *     security: 
  *       - Bearer: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: MaBaiThi
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
  *             TenBaiThi:
  *               type: string
  *             CheDo:
  *               type: integer
  *             BaiThiYeuThich:
  *               type: integer
  *             ChuDe:
  *               type: string
  *             ThoiGianBatDau:
  *               type: date
  *             ThoiGianThi:
  *               type: integer
  *               description: unit minutes
  *             AnhBia:
  *               type: string
  *               description: path to AnhBia
  *             MatKhauBaiThi:
  *               type: string
  *     responses:
  *       200:
  *         description: BaiThi is modified successfully
  */ 

 router.put('/mod/:Id(baithi_[a-zA-Z0-9]{10})', auth.isAuthunticated, BaiThiController.modBaiThi);

module.exports = router;
