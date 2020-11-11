const router = require('express').Router();
const UsersController = require('../../controllers/UsersController');
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
 * /users/{MaUser}:
 *   get:
 *     tags:
 *       - Users
 *     description: Return a specific user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: MaUser
 *        description: numeric id of the user to get /user_[a-zA-Z0-9]{10}/
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: a single user object
 */
router.get('/:Id(user_[a-zA-Z0-9]{10})', UsersController.getUserById);

/**
 * @swagger
 * /users/{MaUser}:
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: MaUser
 *        description: MaUser of deleting User
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: delete user with MaUser
 */
router.delete('/:Id(user_[a-zA-Z0-9]{10})', auth.isAuthunticated, UsersController.deleteById);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return the user profile
 */
router.get('/profile', auth.isAuthunticated, UsersController.getProfile);

/**
 * @swagger
 * /users/profile/mod:
 *  put:
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    security:
 *      - Bearer: []
 *    parameters:
 *      - name: body
 *        in: body
 *        description: modify your profile
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            Username:
 *              type: string
 *              description: an Username between 6 to 100 characters
 *            Password:
 *              type: string
 *              description: a password between 7 to 100 characters which contain at least one numeric digit and a special character
 *            HoTen:
 *              type: string
 *            NgheNghiep:
 *              type: string
 *            GioiTinh:
 *              type: integer
 *            QueQuan: 
 *              type: string
 *            Email: 
 *              type: string
 *            SoDienThoai:
 *              type: string
 *            NgaySinh:
 *              type: date
 *    responses:
 *      200:
 *        description: Your profile has been modified successfully
 */

router.put('/profile/mod', auth.isAuthunticated, UsersController.modifyProfile);

/**
  * @swagger
  * /users/add:
  *   post:
  *     tags:
  *       - Users
  *     produces:
  *       - application/json
  *     security:
  *       - Bearer: []
  *     parameters:
  *     - name: body
  *       in: body
  *       description: create new User
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
  *         description: User is created successfully
  */

router.post('/add', auth.isAuthunticated, UsersController.addUser);

/**
 * @swagger
 * /users/mod/{MaUser}:
 *  put:
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    security:
 *      - Bearer: []
 *    parameters:
 *      - name: MaUser
 *        in: path
 *        description: MaUser of specify user /user_[a-zA-Z0-9]{10}/
 *        required: true
 *        type: string
 *      - name: body
 *        in: body
 *        description: modify some fields of User who have MaUser
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            Username:
 *              type: string
 *              description: an Username between 6 to 100 characters
 *            Password:
 *              type: string
 *              description: a password between 7 to 100 characters which contain at least one numeric digit and a special character
 *            HoTen:
 *              type: string
 *            NgheNghiep:
 *              type: string
 *            GioiTinh:
 *              type: integer
 *            QueQuan: 
 *              type: string
 *            Email: 
 *              type: string
 *            SoDienThoai:
 *              type: string
 *            NgaySinh:
 *              type: date
 *    responses:
 *      200:
 *        description: User has been modified successfully
 */

router.put('/mod/:Id(user_[a-zA-Z0-9]{10})', auth.isAuthunticated, UsersController.modifyUser);

/**
 * @swagger
 * /users/list:
 *  get:
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    security:
 *      - Bearer: []
 *    parameters:
 *      - name: page
 *        in: query
 *        description: paginate
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: list User OK
 */

router.get('/list', auth.isAuthunticated, UsersController.listUser);

module.exports = router;
