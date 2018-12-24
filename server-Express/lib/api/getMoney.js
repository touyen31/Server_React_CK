const Block  = require('../../models/block')
module.exports = async (account) => {
    let total = 0;
    try{
        let blocks = await Block.find({$or: [{account: account}, {"params.address": account}]});
        blocks.forEach(block => {
            if(block.operation === 'payment') {
                if(block.params.address === account)
                    total+=block.params.amount;
                else{
                    total -= block.params.amount;
                }
            }
        })

    } catch (e) {

    }
    return total;
}