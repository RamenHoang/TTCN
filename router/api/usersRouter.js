const router = require('express').Router();
const UsersController = require('../../controllers/UsersController');
const auth = require('../../utils/auth');
/**
   * @swagger
   * definitions:
   *   users:
   *     required:
   *       - id
   *       - username
   *       - email
   *     properties:
   *       id:
   *         type: integer
   *       username:
   *         type: string
   *       email:
   *         type: string
   */


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - users
 *     description: Return a specific user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: numeric id of the user to get
 *        in: path
 *        required: true
 *        type: integer
 *        minimum: 1
 *     responses:
 *       200:
 *         description: a single user object
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/:id', UsersController.getUserById);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: numeric id of the user to get
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: delete user with id
 */
router.delete('/:id', auth.isAuthunticated, UsersController.deleteById);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return the user profile
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/profile', auth.isAuthunticated, UsersController.getProfile);


router.post('/add', auth.isAuthunticated, UsersController.addUser);

module.exports = router;
