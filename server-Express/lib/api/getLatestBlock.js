const Block = require('../../models/block');

const getLatestBlock = async () => {
    let block = await Block.findOne().sort({height: -1});
    if(!block)
        return 0;
    return block.height;
}

module.exports = getLatestBlock;