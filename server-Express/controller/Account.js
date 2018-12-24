const Block = require('../models/block')
const Account = require('../models/account')
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
    let flag = 'data:image/jpeg;base64,';
    if(!req.file || (req.file.size / 1024) > 20 || !req.body.secretkey){
        return res.status(400).end();
    }
    console.log(req.file)
    let data = base64Img.base64Sync(req.file.path);
    data = data.slice(data.indexOf(flag) + flag.length);

    let params = {
        key: 'picture',
        value: data
    }
    return sendTx(req.params.account, 'update_account', params, req.body.secretkey)
        .then(response => {
            console.log(response)
            if(response.log === '')
                res.json({
                    Success: true
                })
            else
                res.status(400).end();
        })
        .catch(e => {
            console.log(e);
            res.status(400).end();
        })
}
const GetAccountAvatar = async (req, res)=>{
    try {
        let blocks = await Block.find({account: req.params.account, operation: 'update_account', "params.key": 'picture' }).sort({time: -1}).limit(1);
        let flag='data:image/jpeg;base64,'
        if(blocks.length ===0)
            return res.json({
                Avatar: ''
            })
        return res.json({
            Avatar: blocks[0].params.value
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).end();

    }

}

const PostStatus = async (req, res)=>{
    let params = {
        content:{
            type: 1,
            text:req.body.text
        },
        keys:[]
    }
    return sendTx(req.params.account, 'post', params, req.body.secretkey)
        .then(responese => {
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

const GetAllMyStatus = async (req, res)=>{
    try {
        let blocks = await Block.find({account: req.params.account, operation: 'post'}).sort({time: -1});
        if(blocks.length ===0)
            return res.json({
                data: ''
            })
        return res.json({
            data: blocks
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).end();

    }

}


const GetFollower = async(req, res) => {
    let account = req.params.account
    if(!account)
        return res.status(400).end();
    try {
        let rows = await Account.find({following: {$all: [account]}})
        rows = rows.map(row => row.account);
        return res.json({
            follower: rows
        })

    }catch (e) {
        return res.json({
            follower: []
        })
    }
}


module.exports = {
    GetAllByAddress,
    GetSequence,
    CountMoney,
    UpdateAccountName,
    GetAccountName,
    UpdateAccountAvatar,
    GetAccountAvatar,
    PostStatus,
    GetAllMyStatus,
    GetFollower
}