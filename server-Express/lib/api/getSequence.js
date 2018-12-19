const Block = require('../../models/block');

const getSequence = async (account) => {
    let row = await Block.find({account: account}).sort({sequence: -1}).limit(1);
    if(row.length === 0){
        return 1;
    }
    return row[0].sequence + 1;
}

module.exports = getSequence;