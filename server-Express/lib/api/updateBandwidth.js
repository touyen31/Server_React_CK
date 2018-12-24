const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;
const Account = require('../../models/account')
const getMoney = require('./getMoney')
const moment = require('moment');
const updateBandwidth = async (address, block) => {
    const txSize = Buffer.from(block.block.data.txs[0], 'base64').length;
    var account, newAccount;
    let res = await Promise.all([getMoney(address), Account.findOne({
        account: address
    })])
    let balance = res[0];
    let _account = res[1];
    if(!_account){
        newAccount = new Account({
            account: address,
            bandwidth: 0,
            bandwidthtime: null,
            energy: 0,
            following: []
        })
        account = {
            account: address,
            bandwidth: 0,
            bandwidthtime: null,
            energy: 0,
            following: []
        }
        await newAccount.save();
    }
    else account = {
        account: _account.account,
        bandwidth: _account.bandwidth,
        bandwidthtime: _account.bandwidthtime,
        energy: _account.energy,
        following: _account.following
    }
    const diff = account.bandwidthtime ? moment(block.block.header.time).unix() - moment(account.bandwidthtime).unix() :
        BANDWIDTH_PERIOD;

    account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
    account.bandwidthtime = block.block.header.time;
    account.energy = balance * NETWORK_BANDWIDTH / MAX_CELLULOSE - account.bandwidth;
    await Account.findOneAndUpdate({account: account.account}, account);

}

module.exports = updateBandwidth;
