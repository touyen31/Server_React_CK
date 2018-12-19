let { RpcClient } = require('tendermint')
let client = RpcClient('wss://dragonfly.forest.network:443')

module.exports = client;