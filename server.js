const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config')
const mongoose = require ('mongoose')
const cors = require ('cors')
const jwt = require('jsonwebtoken');
const logger = require('morgan')
const user = require ('./app/routes/user.routes')
const Notes = require('./app/routes/note.routes')

mongoose.Promise = global.Promise
// creat express app
const app = express();

app.set('secretKey', 'nodeRestApi')

app.use(cors())
app.use(logger('dev'))
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

app.use('/api/user',user)

app.use('/api/notes',validateUser,Notes)

function validateUser(req, res, next) {
    jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}
app.listen(6000,()=>{
    console.log('server port 6000')
})