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

module.exports = router;