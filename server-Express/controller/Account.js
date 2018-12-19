const Block = require('../models/block')
const getSequence = require('../lib/api/getSequence')
const sendTx = require('../lib/api/sendTx')
const base64Img = require('base64-img')
const GetAllByAddress = async (req, res) => {
    let account = req.params.account;
    try{
        let blocks = await Block.find({$or: [{account: account}, {"params.address": account}]});
        return res.json({
            data: blocks
        })
    } catch (e) {
        return res.status(400).end();
    }

}

const GetSequence = async (req, res) => {
    try {
        let sequence = await getSequence(req.params.account);
        return res.json({
            sequence
        })
    }
    catch (e) {
        return res.status(400).end();
    }
}

const CountMoney = async (req, res) => {
    let account = req.params.account;
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
        return res.json({
            totalMoney: total
        })
    } catch (e) {
        return res.status(400).end();
    }
}
const UpdateAccountName = async (req,res)=>{
    if(!req.body.name || !req.body.secretkey){
        return res.status(400).end();
    }
    let params = {
        value: req.body.name,
        key: 'name'
    }
    return sendTx(req.params.account, 'update_account', params, req.body.secretkey)
        .then(responese => {
            console.log(responese)
            if(responese.log === ''){
                return res.json({
                    Success: true
                })
            }
            else return res.status(400).end()
        })
        .catch(e =>{
            console.log(e);
            res.status(400).end()
        })
}
const GetAccountName = async (req, res)=>{
    try {
        let blocks = await Block.find({account: req.params.account, operation: 'update_account', "params.key": 'name' }).sort({time: -1}).limit(1);
        if(blocks.length ===0)
            return res.json({
                Name: ''
            })
        return res.json({
            Name: blocks[0].params.value
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).end();

    }

}

const UpdateAccountAvatar = async (req, res)=>{
    if(!req.file || (req.file.size / 1024) > 20 || !req.body.secretkey){
        return res.status(400).end();
    }
    console.log(req.file)
    // const data = base64Img.base64Sync(req.file.path);

    // let params = {
    //     key: 'picture',
    //     value: data
    // }
    // console.log(params);
    // return sendTx(req.params.account, 'update_account', params, req.body.secretkey)
    //     .then(response => {
    //         if(response.log === '')
    //             res.json({
    //                 Success: true
    //             })
    //         else
    //             res.status(400).end();
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         res.status(400).end();
    //     })
}



module.exports = {
    GetAllByAddress,
    GetSequence,
    CountMoney,
    UpdateAccountName,
    GetAccountName,
    UpdateAccountAvatar
}