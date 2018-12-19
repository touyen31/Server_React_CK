const client = require('../../config/rcpClient');
const {encode, sign} = require('../transaction');
const  getSequence = require('./getSequence')
module.exports = async (account, operation, params, secretKey) => {
    let sequence = await getSequence(account);
    let tx = {
        version: 1,
        account: account,
        sequence,
        memo: Buffer.alloc(0),
        params,
        operation,
        signature: Buffer.alloc(64, 0)
    }
    sign(tx, secretKey);
    let decodeTX = encode(tx);
    let strBase64 = decodeTX.toString('base64');
    return client.broadcastTxSync({tx: strBase64});
}