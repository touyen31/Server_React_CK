const sendTx = require('../lib/api/sendTx');

const PostPayment = async (req, res) => {
    if(!req.body.account || !req.body.sendto || !req.body.amount || !req.body.secretkey){
        return res.status(400).end();
    }
    let params = {
        address: req.body.sendto,
        amount: parseInt(req.body.amount, 10)
    }
    return sendTx(req.body.account, 'payment', params, req.body.secretkey)
        .then(responese => {
            if(responese.log === ''){
                return res.json({
                    Success: true
                })
            }
            else return res.status(400).end()
        })
        .catch(e =>{
            console.log(e);
            res.status(400).end()
        })
}


module.exports = {
    PostPayment
}