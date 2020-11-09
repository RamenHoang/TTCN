const router = require('express').Router();
const AuthController = require('../../controllers/AuthController');
const auth = require('../../utils/auth');

/**
  * @swagger
  * definitions:
  *   TaUser:
  *     required:
  *       - MaUser
  *       - Username
  *       - Password
  *       - HoTen
  *       - NgheNghiep
  *     properties:
  *       MaUser:
  *         type: string
  *         description: user_`random string length 10`
  *       Username:
  *         type: string
  *         description: an Username between 6 to 100 characters which contain at least one numeric digit
  *       Password:
  *         type: string
  *         description: a password between 7 to 100 characters which contain at least one numeric digit and a special character
  *       HoTen:
  *         type: string
  *       NgheNghiep:
  *         type: string
  *       GioiTinh:
  *         type: boolean
  *       QueQuan:
  *         type: string
  *       Email:
  *         type: string
  *       SoDienThoai:
  *         type: string
  *       NoiLamViec:
  *         type: string
  *       SoNgayHoatDong:
  *         type: string
  *       TrangThai: 
  *         type: string
  *       NgaySinh: 
  *         type: date
  */


/**
  * @swagger
  * /signUp:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: sign up using Username, Password, NgheNghiep, ...
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - Username
  *           - Password
  *           - HoTen
  *           - NgheNghiep
  *         properties:
  *           Username:
  *             type: string
  *             description: an Username between 6 to 100 characters
  *           Password:
  *             type: string
  *             description: a password between 7 to 100 characters which contain at least one numeric digit and a special character
  *           HoTen:
  *             type: string
  *           NgheNghiep:
  *             type: string
  *           GioiTinh:
  *             type: integer
  *           QueQuan:
  *             type: string
  *           Email:
  *             type: string
  *           SoDienThoai:
  *             type: string
  *           NoiLamViec:
  *             type: string,
  *           NgaySinh:
  *             type: date
  *     responses:
  *       201:
  *         description: Account is created successfully
  */


router.post('/signUp', AuthController.signUp);

/**
  * @swagger
  * /login:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: the login credentials
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - Username
  *           - Password
  *         properties:
  *           Username:
  *             type: string
  *             description: an Username between 6 to 100 characters which contain at least one numeric digit
  *           Password:
  *             type: string
  *             description: a password between 7 to 100 characters which contain at least one numeric digit and a special character
  *     responses:
  *       200:
  *         description: user logged in succesfully
  */
router.post('/login', AuthController.login);

/**
  * @swagger
  * /refreshToken:
  *   post:
  *     tags:
  *       - Auth
  *     security:
  *       - Bearer: []
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: the refresh token
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - refreshToken
  *         properties:
  *           refreshToken:
  *             type: string
  *     responses:
  *       200:
  *         description: a new jwt token with a new expiry date is issued
  */
router.post('/refreshToken', AuthController.refreshToken);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: log out from application
 */
router.post('/logout', auth.isAuthunticated, AuthController.logOut);

module.exports = router;
