module.exports = (app)=>{

    const notes =require('../controller/note.controller');
    var multer = require('multer')
    var storage = multer.diskStorage({
        destination: function (req, img, cb) {
          cb(null, './public/img')
        },
        filename: function (req, img, cb) {
          cb(null, req.body.title + '.jpg')
        }
      })
       
      var upload = multer({ storage: storage })

    app.post ('/notes',upload.single('img'),notes.create);   

    app.get ('/notes',notes.findAll);

    app.get ('/notes/:noteId', notes.findOne);

    app.put('/notes/:noteId',upload.single('img'),notes.update);

    app.delete('/notes/:noteId',notes.delete)
}