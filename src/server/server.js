const express = require('express')
const mongoose=require('mongoose')
const proxy=require('http-proxy-middleware')
const app = express();
//连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/react-project',{ useNewUrlParser: true })
mongoose.connection.on('connect',()=>{
    console.log('mongo connect success')
})
//基于mongoose的文档模型Schema
// const User =mongoose.model('user',new mongoose.Schema({
//     user:{type:String,required:true},
//     password:{type:String,required:true}
// }))

//利用中间件配置静态资源服务器
app.use(express.static('./build'))


//后端允许跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method === "OPTIONS") {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
});


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
// app.get('/', (req, res) => {
//     res.send('<h1>1111</h1>')
// })
// app.get('/data', (req, res) => {
//     User.find({user:'tom'},(err,doc)=>{
//         res.json(doc)
//     })
// })

app.use('/api/v1', proxy({
    "target": "https://www.slmcjms.com/",
    "changeOrigin": true
}));

app.listen('3001', () => {
    console.log('node server start at port 3001')
})