const router = require('express').Router();
const sendTx = require('../lib/api/sendTx')
const {GetUnsignedHash, ReceiveTx} = require('../controller/Transaction')
router.post('/unsignedhash', GetUnsignedHash);
router.post('/receiveTx', ReceiveTx);

module.exports = router;