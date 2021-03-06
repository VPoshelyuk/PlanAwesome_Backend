const router = require('express').Router()
const Cryptr = require('cryptr')
const mongodb = require("mongodb")
const Note = require('../models/Note')
const User = require('../models/User')
const cryptr = new Cryptr(process.env.CRYPTR_KEY)

router.post('/add', async (req, res) => {
// console.log("\n>> Add note:\n", note);
    let note = new Note({
        title: req.body.title,
        content: cryptr.encrypt(req.body.content)
    })
    note.save()
    User.findByIdAndUpdate(
        req.body.user_id,
        {
        $push: {
            notes: {
                _id: note._id,
                title: note.title,
                content: note.content
            }
        }
        },
        { new: true, useFindAndModify: false },
        function (err, model) {
          if (err) {
            //console.log(err);
            return res.send(err);
          }
          return res.json(model);
        }
    )

})

router.patch('/update', async (req, res) => {
    let note = await Note.updateOne({'_id': new mongodb.ObjectID(req.body.note_id)},
    {$set:{
        title: req.body.title,
        content: req.body.content
    }})
    let user = await User.updateOne(
        { _id : new mongodb.ObjectID(req.body.user_id), "notes._id": new mongodb.ObjectID(req.body.note_id)},
        { $set: { 
            "notes.$.title" : req.body.title,
            "notes.$.content": req.body.content
        }}
    )
    try {
        const svdUser = await user.save()
        res.send(note)
    } catch (er) {
        res.status(400).send(er)
    } 
})

router.delete('/remove', async (req, res) => {
    let note_id = new mongodb.ObjectID(req.body.note_id)
    const user = await User.findByIdAndUpdate(
        req.body.user_id,
        {
        $pull: { 
            notes : {
                _id : {$in: [note_id]}
            } 
        }
        },
        { useFindAndModify: false });
    Note.deleteOne({_id: note_id}, function(error, results) {
            if (error){
                return res.send(error);
            }
            console.log("success");
         })
        try {
            const svdUser = await User.findById(req.body.user_id)
            res.send(svdUser)
        } catch (er) {
            res.status(400).send(er)
        }
})

module.exports = router