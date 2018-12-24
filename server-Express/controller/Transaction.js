const getSequence = require('../lib/api/getSequence');
const {getUnsignedHash, encode} = require('../lib/transaction')
const sendTx = require('../lib/api/sendTx')
const GetUnsignedHash = async (req, res) => {
    if(!req.body.account || !req.body.params || !req.body.operation)
        return res.status(400).end();
    let sequence = await getSequence(req.body.account);
    let tx = {
        version: 1,
        account: req.body.account,
        sequence,
        memo: Buffer.alloc(0),
        params: req.body.params,
        operation: req.body.operation,
        signature: Buffer.alloc(64, 0)
    }
    let newTx = Object.assign({}, tx);
    console.log(tx)
    try {
        let UnsignedHash= getUnsignedHash(tx);
        return res.json({
            UnsignedHash,
            tx: newTx
        })
    }
    catch (e) {
        console.log(e)
        return res.status(400).end()
    }
}

const ReceiveTx = async(req, res) => {
    let tx = req.body.tx;
    tx.memo = new Buffer.from(tx.memo.data)
    tx.signature = new Buffer.from(tx.signature.data)
    console.log(tx)
    let _encode = encode(tx);
    let str = _encode.toString('base64');
    sendTx(str).then(response => {
        if(response.log === ''){
            return res.json({
                Success: true
            })
        }
        else
            return res.status(400).json({
                Success: false,
                Message: response.log
            })
    }).catch(e => {
        return res.status(400).json({
            Success: false,
            Message: e.message
        })
    })
}


module.exports = {
    GetUnsignedHash,
    ReceiveTx
}