const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema({
    title : {type:String},
    content : {type:String},
},{
    timeStamps: true
})

module.exports = mongoose.model('Note',NoteSchema)