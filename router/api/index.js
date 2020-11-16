const router = require('express').Router();

router.use('/cauhoi', require('./cauhoiRouter'));

router.use('/dapan', require('./dapAnRouter'));

router.use('/nganhang', require('./nganHangRouter'));

router.use('/baithi', require('./baiThiRouter'));

router.use('/users', require('./usersRouter'));

router.use('/', require('./authRouter'));

module.exports = router;
