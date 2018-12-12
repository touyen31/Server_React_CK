const router = require('express').Router();
const getBlockByAccount = require('../controller/getBlockByAccount')
router.get('/:account', async (req, res) => {
    try {
        let rows = await getBlockByAccount(req.params.account);
        res.json({
            rows
        })
    } catch(e)
    {
        console.log(e)
        res.status(400).end();
    }
})

router.get('/:account/tien', async (req, res) => {
    res.send('Tien')
})

router.post('/:account/tien', async (req, res) => {
    console.log(req.body)
    res.send('ok')
})

module.exports = router;