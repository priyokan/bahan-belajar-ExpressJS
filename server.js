const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config')
const mongoose = require ('mongoose')
const cors = require ('cors')
var jwt = require('jsonwebtoken');
const user = require ('./app/routes/user.routes')

mongoose.Promise = global.Promise
// creat express app
const app = express();

app.set('secretKey', 'nodeRestApi')

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.use(bodyParser())

app.use(express.static('public'))

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
})
.then(()=>{
    console.log('berhasil terhubung dengan database')
}).catch(err=>{
    console.log('gagal terhubung karena',err)
    process.exit()
})

app.get("/",(req,res)=>{
    res.json({"message":"Wellcome this is my api"})
})

app.use('/api',user)
require('./app/routes/note.routes')(app)

app.listen(6000,()=>{
    console.log('server port 6000')
})