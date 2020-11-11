const router = require('express').Router();

router.use('/nganhang', require('./nganHangRouter'));

router.use('/baithi', require('./baiThiRouter'));

router.use('/users', require('./usersRouter'));

router.use('/', require('./authRouter'));

module.exports = router;
