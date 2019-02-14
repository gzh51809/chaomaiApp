const express = require('express')
const mongoose=require('mongoose')

//连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/react-project',{ useNewUrlParser: true })
mongoose.connection.on('connect',()=>{
    console.log('mongo connect success')
})
//基于mongoose的文档模型Schema
const User =mongoose.model('user',new mongoose.Schema({
    user:{type:String,required:true},
    password:{type:String,required:true}
}))
// User.create({
//     user:'tom',
//     password:'123456'
// },(err,doc)=>{
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
// User.update({'user':'tom'},{'$set':{password:'456258'}},(e,d)=>console.log(d))
//新建一个node服务器
const app = express();
app.get('/', (req, res) => {
    res.send('<h1>1111</h1>')
})
app.get('/data', (req, res) => {
    User.find({user:'tom'},(err,doc)=>{
        res.json(doc)
    })
})
app.listen('3009', () => {
    console.log('node server start at port 3009')
})