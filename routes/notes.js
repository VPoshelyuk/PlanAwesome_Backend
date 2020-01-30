const router = require('express').Router()
const Cryptr = require('cryptr')
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
    let user = User.findByIdAndUpdate(
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

    // const { error } = registerValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    // const emailExists = await User.findOne({email: req.body.email})
    // if(emailExists) return res.status(400).send("Email already exists!")

    // const salt = await bcrypt.genSalt(3)
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // const user = new User({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     password: hashedPassword
    // })
    // try {
    //     const svdUser = await user.save()
    //     res.send(svdUser)
    // } catch (er) {
    //     res.status(400).send(er)
    // }
})

router.delete('/remove', async (req, res) => {
    
    // const { error } = loginValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    // const user = await User.findOne({email: req.body.email})
    // const validPass = await bcrypt.compare(req.body.password, user.password)
    // if(!user || !validPass) return res.status(400).send("User with entered credentials doesn't exist!")

    // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    // res.header("Auth-token", token).send(user)
})

module.exports = router