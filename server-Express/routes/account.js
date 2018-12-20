const router = require('express').Router();
const {GetAllByAddress, GetSequence, CountMoney,
    UpdateAccountName, GetAccountName, UpdateAccountAvatar,
    GetAccountAvatar, PostStatus, GetAllStatus
} = require('../controller/Account')
const upload = require('../config/multer');
router.get('/:account', GetAllByAddress);
router.get('/:account/sequence',GetSequence);
router.get('/:account/money',CountMoney);
router.get('/:account/name',GetAccountName );
router.get('/:account/avatar', GetAccountAvatar);
router.get('/:account/status', GetAllStatus);


router.post('/:account/name', UpdateAccountName);
router.post('/:account/avatar', upload.single('avatar'), UpdateAccountAvatar)
router.post('/:account/status', PostStatus)
module.exports = router;