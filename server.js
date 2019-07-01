const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config')
const mongoose = require ('mongoose')
const multer = require('multer')
const upload = multer()
const cors = require ('cors')

mongoose.Promise = global.Promise
// creat express app
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.use(bodyParser())

app.use(upload.array())
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

require('./app/routes/note.routes')(app)

app.listen(5000,()=>{
    console.log('server port 5000')
})