const client = require('../../config/rcpClient');
let {decode} = require('../transaction')
let Block = require('../../models/block')

require('../../config/mongo')
//lấy hết tất cả các block về

async function listener (block) {
    let height = block.block.header.height;
    while (index < height){
        let tmp = await client.block({height: index});
        index ++;
        let txs = tmp.block.data.txs;
        if(txs!= null){
            let _decode = txs.map(i => decode(Buffer.from(i, 'base64')));
            //luu xuong db
            let blocks = _decode.map(i => ({
                account: i.account,
                sequence:i.sequence,
                operation:i.operation,
                params:i.params,
                time: tmp.block.header.time

            }))
            blocks.forEach(async e =>{
                try {
                    await Block.findOneAndUpdate({account:e.account, sequence:e.sequence}, e, {upsert:true})
                    console.log("thanh cong" + tmp.block.header.height)
                }catch (e) {
                    console.log(e)
                }

            })
        }
    }

}




let index = 1;
client.subscribe({query: "tm.event = 'NewBlock'"}, (e) => listener(e))