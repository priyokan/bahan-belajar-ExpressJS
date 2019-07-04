const Note = require('../models/note.model')

exports.create = (req, res)=>{
    if(!req.body.content){
        return res.status(404).send({
            message:"Note content tidak boleh kosong"
        })
    }
    let note = new Note({
        title:req.body.title||'tanpa judul',
        content : req.body.content,
        img:'http://localhost:5000/public/img/'+req.body.title+'.jpg'
    })

    note.save()
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message:err.message||"sesuatu error"
        })
    });
    // const formData = req.body;
    // console.log('form data', formData);
}

exports.findAll = (req, res)=>{
    Note.find()
    .then(notes=>{
        res.send(notes)
    }).catch(err=>{
        res.status(500).send({
            message:err.message||"sesusatu error"
        })
    })
}

exports.findOne = (req, res)=>{
    Note.findById(req.params.noteId)
    .then((note) => {
        if(!note){
            return res.status(404).send({
                message:"data tidak ditemukan"+req.params.noteId
            })
        }
        res.send(note)
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"data tidak ditemukan"+req.params.noteId
            })}

            return res.status(500).send({
                message:'Error penerimaan data'
            })
        
    });
}

exports.update = (req, res)=>{
    if(!req.body.content){
        return res.status(404).send({
            message:"ID tidak boleh kosong"
        })
    }
    Note.findByIdAndUpdate(req.params.noteId,{
        title: req.body.title || "tanpa judul",
        content : req.body.content,
        img:'http://localhost:5000/public/img/'+req.body.title+'.jpg'
    },{new:true})
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message:'Note dengan Id'+req.params.noteId+"tidak ditemukan"
            })
        }
        res.send(note)
    }).catch(err=>{
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: 'Note dengan Id'+req.params.noteId+"tidak ditemukan"
            })
        }
        return res.status(500).send({
            message:'sesuatu error'
        })
    })
}

exports.delete = (req, res)=>{
    Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
        if(!note){
            return res.status(404).send({
                message : 'Note not found'
            })
        }
        res.send({
            message:'Note terhapus!'
        })
    }).catch(err=>{
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: 'Note dengan Id'+req.params.noteId+"tidak ditemukan"
            })
        }
        return res.status(500).send({
            message:'sesuatu error'
        })
    })
}