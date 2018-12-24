const client = require('../../config/rcpClient');
let {decode} = require('../transaction')
let Block = require('../../models/block')
const updateBandwidth = require('./updateBandwidth')
const updateFollow = require('./updateFollow')
const getLatestBlock = require('./getLatestBlock')
require('../../config/mongo')
//lấy hết tất cả các block về
let index = 1;


client.subscribe({query: "tm.event = 'NewBlock'"},async (block) => {
    let height = block.block.header.height;
    let latestHeight = await getLatestBlock();
    index = latestHeight + 1;
    while (index < height){
        let tmp = await client.block({height: index});
        let txs = tmp.block.data.txs;
        if(txs!= null){
            try {
                let _decode = txs.map(i => decode(Buffer.from(i, 'base64')));
                //luu xuong db
                let blocks = _decode.map(i => ({
                    account: i.account,
                    sequence:i.sequence,
                    operation:i.operation,
                    params:i.params,
                    time: tmp.block.header.time,
                    height: tmp.block.header.height,
                    hash: tmp.block.header.data_hash
                }))
                blocks.forEach(async e =>{
                    try {
                        await Block.findOneAndUpdate({account:e.account, sequence:e.sequence}, e, {upsert:true})
                        await updateBandwidth(e.account,tmp)
                        if(e.params.key === 'followings')
                            await updateFollow(e.account, e.params.value)
                        console.log("thanh cong" + tmp.block.header.height)
                    }catch (e) {
                        console.log(e)
                    }

                })
            } catch(e)
            {
                console.log(e)
            }

        }
        index += 1;
    }

})