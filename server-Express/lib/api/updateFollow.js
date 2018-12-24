const Account = require('../../models/account');
module.exports = (account, value) => {
    return Account.findOneAndUpdate({account: account}, {following: value});
}