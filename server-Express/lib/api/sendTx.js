const client = require('../../config/rcpClient');
module.exports = async (strBase64) => {
    return client.broadcastTxSync({tx: strBase64});
}