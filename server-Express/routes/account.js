const router = require('express').Router();
const {GetAllByAddress, GetSequence, CountMoney,
    UpdateAccountName, GetAccountName, UpdateAccountAvatar,
    GetAccountAvatar, PostStatus, GetAllMyStatus, GetFollower, GetFollowing, GetEnergy, GetAllStatusAllAccount, getComment,
GetReaction
} = require('../controller/Account')
const upload = require('../config/multer');
router.get('/:account', GetAllByAddress);
router.get('/:account/sequence',GetSequence);
router.get('/:account/money',CountMoney);
router.get('/:account/name',GetAccountName );
router.get('/:account/avatar', GetAccountAvatar);
router.get('/:account/status', GetAllMyStatus);
router.get('/:account/follower',GetFollower);
router.get('/:account/following', GetFollowing);
router.get('/:account/energy', GetEnergy);
router.get('/:account/All',GetAllStatusAllAccount );
router.get('/comment/:hash', getComment);
router.get('/reaction/:hash',GetReaction )


router.post('/:account/name', UpdateAccountName);
router.post('/:account/avatar', upload.single('avatar'), UpdateAccountAvatar)
router.post('/:account/status', PostStatus)
module.exports = router;