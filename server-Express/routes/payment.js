const router = require('express').Router();
const {PostPayment} = require('../controller/Payment')
router.post('/', PostPayment);


module.exports = router;