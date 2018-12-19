const router = require('express').Router();
const {GetAllByAddress, GetSequence, CountMoney, UpdateAccountName, GetAccountName, UpdateAccountAvatar} = require('../controller/Account')
const upload = require('../config/multer');
router.get('/:account', GetAllByAddress);
router.get('/:account/sequence',GetSequence);
router.get('/:account/money',CountMoney);
router.get('/:account/name',GetAccountName );


router.post('/:account/name', UpdateAccountName);
router.post('/:account/avatar', upload.single('avatar'), UpdateAccountAvatar)
module.exports = router;