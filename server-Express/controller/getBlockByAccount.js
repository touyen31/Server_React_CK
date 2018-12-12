const Block = require('../models/block')

const getBlockByAccount = async (account) => {
    let blocks = await Block.find({$or: [{account: account}, {"params.address": account}]});
    return blocks;
}

module.exports = getBlockByAccount;